export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffSec = Math.round((Date.now() - then) / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (abs < 60) return rtf.format(-diffSec, 'second');
  if (abs < 3600) return rtf.format(-Math.round(diffSec / 60), 'minute');
  if (abs < 86400) return rtf.format(-Math.round(diffSec / 3600), 'hour');
  if (abs < 604800) return rtf.format(-Math.round(diffSec / 86400), 'day');
  if (abs < 2629800) return rtf.format(-Math.round(diffSec / 604800), 'week');
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCompactCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0).replace(/\.0$/, '')}k`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
}

export function shortenDid(did: string, edge = 8): string {
  if (did.length <= edge * 2 + 1) return did;
  return `${did.slice(0, edge)}…${did.slice(-edge)}`;
}
