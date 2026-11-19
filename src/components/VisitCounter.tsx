import { useEffect } from 'react';

// One request per document, including under React StrictMode. No visitor storage.
let recorded = false;

export default function VisitCounter() {
    useEffect(() => {
        const endpoint = (import.meta.env.VITE_VIEW_COUNTER_URL as string | undefined)?.trim();
        if (recorded || !endpoint || import.meta.env.DEV) return;
        recorded = true;

        void fetch(endpoint, {
            method: 'POST',
            headers: { 'X-Counter-Request': '1' },
            credentials: 'omit',
            referrerPolicy: 'no-referrer',
            cache: 'no-store',
            signal: AbortSignal.timeout(8000),
        }).catch(() => {
            // Counting is best effort. Do not retry an increment with an unknown outcome.
        });
    }, []);

    return null;
}
