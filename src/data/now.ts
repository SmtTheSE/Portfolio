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
  status: 'Building and shipping mobile apps at Ad Venture Studio',
  focus: 'Mobile apps · Store releases · Backend systems',
  location: 'Ho Chi Minh City, VN',
  availableForWork: false,
  updatedAt: '2026-07-24',
};
