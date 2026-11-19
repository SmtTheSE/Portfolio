import assert from 'node:assert/strict';
import test from 'node:test';

// Run against the local Worker with VIEW_COUNT_TOKEN=local-test-only.
const base = 'http://127.0.0.1:8787';
const origin = 'http://127.0.0.1:5173';
const read = async () => {
    const response = await fetch(`${base}/views`, {
        headers: { Authorization: 'Bearer local-test-only' },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    return (await response.json()).views;
};

test('private, atomic aggregate counter', async () => {
    const before = await read();

    for (const headers of [{}, { Authorization: 'Bearer wrong' }, { Origin: origin }]) {
        const response = await fetch(`${base}/views`, { headers });
        assert.equal(response.status, 401);
        assert.equal(await response.text(), 'Unauthorized');
    }

    const preflight = await fetch(`${base}/views`, { method: 'OPTIONS', headers: { Origin: origin } });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get('access-control-allow-origin'), origin);
    assert.equal(preflight.headers.get('access-control-allow-headers'), 'X-Counter-Request');

    for (const headers of [{}, { Origin: origin }, { Origin: 'https://untrusted.example', 'X-Counter-Request': '1' }]) {
        const response = await fetch(`${base}/views`, { method: 'POST', headers });
        assert.equal(response.status, 403);
    }
    assert.equal(await read(), before, 'rejected requests and preflight must not increment');

    await Promise.all(Array.from({ length: 25 }, async () => {
        const response = await fetch(`${base}/views`, {
            method: 'POST', headers: { Origin: origin, 'X-Counter-Request': '1' },
        });
        assert.equal(response.status, 204);
        assert.equal(await response.text(), '', 'public response must not expose the count');
        assert.equal(response.headers.get('set-cookie'), null);
    }));
    assert.equal(await read(), before + 25, 'concurrent visits must not lose increments');

    const admin = await fetch(`${base}/admin`);
    assert.equal(admin.status, 200);
    assert.equal(admin.headers.get('x-robots-tag'), 'noindex, nofollow');
    const html = await admin.text();
    assert.ok(html.includes('type="password"'));
    assert.ok(!html.includes('local-test-only'));
    assert.ok(!html.includes(String(before + 25) + ' views'));
});
