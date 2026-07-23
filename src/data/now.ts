/**
 * Local "Now" page source of truth.
 * Keep this updated — the site also tries to read a matching AT Proto record when configured.
 */
export type NowStatus = {
  status: string;
  focus: string;
  location: string;
  availableForWork: boolean;
  updatedAt: string; // ISO date
};

export const nowStatus: NowStatus = {
  status: 'Shipping AT Protocol integrations into my developer portfolio',
  focus: 'Backend systems · Data science · Decentralized identity',
  location: 'Ho Chi Minh City, VN',
  availableForWork: true,
  updatedAt: '2026-07-23',
};
