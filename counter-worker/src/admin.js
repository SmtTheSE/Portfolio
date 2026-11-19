export const adminHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Portfolio views — private</title>
<style>
body{margin:0;background:#7b432a;color:#fff6ea;font:16px system-ui,sans-serif;display:grid;min-height:100svh;place-items:center}
main{width:min(26rem,calc(100% - 3rem));padding:2rem 0}h1{font-size:1.6rem;font-weight:500}
p{line-height:1.6;color:#f0cfae}label{display:block;margin:2rem 0 .5rem}
input,button{box-sizing:border-box;font:inherit;border-radius:4px;padding:.8rem;width:100%}
input{background:#683622;color:#fff6ea;border:1px solid #b07050}button{margin-top:1rem;background:#f6c945;border:0;color:#26140c;cursor:pointer}
:focus-visible{outline:2px solid #f6c945;outline-offset:3px}output{display:block;font-size:2.2rem;margin-top:2rem;font-variant-numeric:tabular-nums}
</style><script src="/admin.js" defer></script></head>
<body><main><h1>Portfolio views</h1><p>Private total. Repeat visits count. No visitor identities are stored.</p>
<form><label for="token">Your counter password</label><input id="token" type="password" required autocomplete="off" spellcheck="false">
<button type="submit">Show total</button></form><output aria-live="polite" aria-atomic="true"></output>
</main></body></html>`;

export const adminScript = `
const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');
const output = document.querySelector('output');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = input.value;
    input.value = '';
    button.disabled = true;
    output.textContent = 'Loading…';
    try {
        const response = await fetch('/views', {
            headers: { Authorization: 'Bearer ' + token },
            credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
            signal: AbortSignal.timeout(8000),
        });
        if (response.status === 401) { output.textContent = 'Incorrect password'; return; }
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (!Number.isSafeInteger(data.views) || data.views < 0) throw new Error();
        output.textContent = data.views.toLocaleString('en-US') + (data.views === 1 ? ' view' : ' views');
    } catch { output.textContent = 'Unable to load count'; }
    finally { button.disabled = false; }
});`;
