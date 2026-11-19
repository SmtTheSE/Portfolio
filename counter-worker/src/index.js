import { DurableObject } from 'cloudflare:workers';
import { adminHtml, adminScript } from './admin.js';

// Only one row is persisted. No request headers, addresses, IDs, or timestamps.
export class ViewCounter extends DurableObject {
    constructor(ctx, env) {
        super(ctx, env);
        this.sql = ctx.storage.sql;
        this.sql.exec('CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY CHECK (id = 1), views INTEGER NOT NULL)');
        this.sql.exec('INSERT OR IGNORE INTO counter (id, views) VALUES (1, 0)');
    }

    async fetch(request) {
        const rows = request.method === 'POST'
            ? this.sql.exec('UPDATE counter SET views = views + 1 WHERE id = 1 RETURNING views')
            : this.sql.exec('SELECT views FROM counter WHERE id = 1');
        return Response.json(rows.one());
    }
}

export default {
    async fetch(request, env) {
        const path = new URL(request.url).pathname;
        if (request.method === 'GET' && (path === '/admin' || path === '/admin.js')) {
            return new Response(path === '/admin' ? adminHtml : adminScript, {
                headers: {
                    'Content-Type': path === '/admin' ? 'text/html; charset=utf-8' : 'text/javascript; charset=utf-8',
                    'Cache-Control': 'no-store',
                    'X-Robots-Tag': 'noindex, nofollow',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'no-referrer',
                    'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'",
                },
            });
        }
        if (path !== '/views') {
            return new Response('Not found', { status: 404 });
        }

        // Reading the total is owner-only. The secret is never sent to the portfolio.
        if (request.method === 'GET') {
            const supplied = request.headers.get('Authorization');
            if (!env.VIEW_COUNT_TOKEN || !supplied || !await matchesToken(supplied, env.VIEW_COUNT_TOKEN)) {
                return new Response('Unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store' } });
            }
            const counter = env.VIEWS.get(env.VIEWS.idFromName('portfolio-total'));
            const response = await counter.fetch(new Request('https://counter.internal/views'));
            return new Response(response.body, {
                status: response.status,
                headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
            });
        }

        const origin = request.headers.get('Origin');
        const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim());
        if (!origin || !allowed.includes(origin)) {
            return new Response('Forbidden', { status: 403 });
        }

        const headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Counter-Request',
            'Access-Control-Max-Age': '86400',
            'Cache-Control': 'no-store',
            'Vary': 'Origin',
        };
        if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
        if (request.method !== 'POST') {
            return new Response('Method not allowed', {
                status: 405, headers: { ...headers, Allow: 'GET, POST, OPTIONS' },
            });
        }
        if (request.headers.get('X-Counter-Request') !== '1') {
            return new Response('Forbidden', { status: 403, headers });
        }

        try {
            const counter = env.VIEWS.get(env.VIEWS.idFromName('portfolio-total'));
            // Forward only the method; visitor metadata never reaches storage.
            const response = await counter.fetch(new Request('https://counter.internal/views', {
                method: request.method,
            }));
            if (!response.ok) throw new Error('Counter write failed');
            // Never disclose the total in the public increment response.
            await response.arrayBuffer();
            return new Response(null, { status: 204, headers });
        } catch {
            return new Response('Counter unavailable', { status: 503, headers });
        }
    },
};

async function matchesToken(supplied, token) {
    const encoder = new TextEncoder();
    const [actual, expected] = await Promise.all([
        crypto.subtle.digest('SHA-256', encoder.encode(supplied)),
        crypto.subtle.digest('SHA-256', encoder.encode(`Bearer ${token}`)),
    ]);
    return crypto.subtle.timingSafeEqual(actual, expected);
}
