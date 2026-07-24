/**
 * Publish local garden notes to the PDS as com.sittminthar.garden.note records.
 *
 *   BLUESKY_HANDLE=you.bsky.social BLUESKY_APP_PASSWORD=xxxx \
 *   npx tsx scripts/publish-garden-notes.ts
 */
import { AtpAgent } from '@atproto/api';
import { localNotes } from '../src/data/notes';

const handle = process.env.BLUESKY_HANDLE;
const password = process.env.BLUESKY_APP_PASSWORD;
const collection = 'com.sittminthar.garden.note';

if (!handle || !password) {
  console.error('Set BLUESKY_HANDLE and BLUESKY_APP_PASSWORD');
  process.exit(1);
}

const agent = new AtpAgent({ service: 'https://bsky.social' });
await agent.login({ identifier: handle, password });

for (const note of localNotes) {
  const record = {
    $type: collection,
    id: note.id,
    title: note.title,
    body: note.body,
    tags: note.tags,
    updatedAt: new Date().toISOString(),
  };

  const res = await agent.com.atproto.repo.putRecord({
    repo: agent.session!.did,
    collection,
    rkey: note.id,
    record,
  });
  console.log('Published note:', note.id, res.data.uri);
}
