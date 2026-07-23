import type { AppBskyRichtextFacet } from '@atproto/api';

type Segment =
  | { type: 'text'; value: string }
  | { type: 'link'; value: string; href: string }
  | { type: 'mention'; value: string; href: string }
  | { type: 'tag'; value: string; href: string };

function byteSlice(text: string, start: number, end: number): string {
  const bytes = new TextEncoder().encode(text);
  return new TextDecoder().decode(bytes.slice(start, end));
}

function segmentPost(text: string, facets?: AppBskyRichtextFacet.Main[]): Segment[] {
  if (!facets?.length) return [{ type: 'text', value: text }];

  const sorted = [...facets].sort((a, b) => a.index.byteStart - b.index.byteStart);
  const segments: Segment[] = [];
  let cursor = 0;

  for (const facet of sorted) {
    const start = facet.index.byteStart;
    const end = facet.index.byteEnd;
    if (start < cursor) continue;
    if (start > cursor) {
      segments.push({ type: 'text', value: byteSlice(text, cursor, start) });
    }

    const value = byteSlice(text, start, end);
    const feature = facet.features[0] as { $type?: string; uri?: string; did?: string; tag?: string } | undefined;

    if (feature?.$type === 'app.bsky.richtext.facet#link' && feature.uri) {
      segments.push({ type: 'link', value, href: feature.uri });
    } else if (feature?.$type === 'app.bsky.richtext.facet#mention' && feature.did) {
      segments.push({ type: 'mention', value, href: `https://bsky.app/profile/${feature.did}` });
    } else if (feature?.$type === 'app.bsky.richtext.facet#tag' && feature.tag) {
      segments.push({ type: 'tag', value, href: `https://bsky.app/hashtag/${encodeURIComponent(feature.tag)}` });
    } else {
      segments.push({ type: 'text', value });
    }
    cursor = end;
  }

  const totalBytes = new TextEncoder().encode(text).length;
  if (cursor < totalBytes) {
    segments.push({ type: 'text', value: byteSlice(text, cursor, totalBytes) });
  }

  return segments;
}

export default function PostText({ text, facets }: { text: string; facets?: AppBskyRichtextFacet.Main[] }) {
  const segments = segmentPost(text, facets);

  return (
    <p className="text-sm md:text-[15px] font-light leading-relaxed text-text-main whitespace-pre-wrap break-words">
      {segments.map((seg, i) => {
        if (seg.type === 'text') return <span key={i}>{seg.value}</span>;
        return (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-border-light hover:border-text-main transition-colors"
          >
            {seg.value}
          </a>
        );
      })}
    </p>
  );
}
