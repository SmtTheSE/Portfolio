import { AtpAgent } from '@atproto/api';
import { atprotoConfig } from '../../config/atproto';

/** Shared public AppView agent (no auth required for reads). */
export const publicAgent = new AtpAgent({
  service: atprotoConfig.service,
});

export function hasAtprotoActor() {
  return Boolean(atprotoConfig.actor);
}
