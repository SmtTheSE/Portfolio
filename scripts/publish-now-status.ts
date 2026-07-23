/**
 * Publish a `com.sittminthar.status.now` record to your PDS.
 *
 * Usage:
 *   BLUESKY_HANDLE=you.bsky.social BLUESKY_APP_PASSWORD=xxxx \
 *   npx tsx scripts/publish-now-status.ts
 *
 * Create an app password at: https://bsky.app/settings/app-passwords
 */
import { AtpAgent } from '@atproto/api';
import { nowStatus } from '../src/data/now';

const handle = process.env.BLUESKY_HANDLE;
const password = process.env.BLUESKY_APP_PASSWORD;
const collection = 'com.sittminthar.status.now';

if (!handle || !password) {
  console.error('Set BLUESKY_HANDLE and BLUESKY_APP_PASSWORD');
  process.exit(1);
}

const agent = new AtpAgent({ service: 'https://bsky.social' });

await agent.login({ identifier: handle, password });

const record = {
  $type: collection,
  status: nowStatus.status,
  focus: nowStatus.focus,
  location: nowStatus.location,
  availableForWork: nowStatus.availableForWork,
  updatedAt: new Date().toISOString(),
};

const res = await agent.com.atproto.repo.putRecord({
  repo: agent.session!.did,
  collection,
  rkey: 'self',
  record,
});

console.log('Published now status:', res.data.uri);
