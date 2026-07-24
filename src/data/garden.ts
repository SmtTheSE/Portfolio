/**
 * Curated Community Garden — people & sites I recommend.
 * People with a Bluesky handle get live profile data from the AppView.
 */
export type GardenPerson = {
  kind: 'person';
  handle: string;
  note: string;
};

export type GardenSite = {
  kind: 'site';
  title: string;
  url: string;
  note: string;
};

export type GardenEntry = GardenPerson | GardenSite;

export const gardenEntries: GardenEntry[] = [
  {
    kind: 'person',
    handle: 'bryn.codes',
    note: 'Community Garden pattern — fetching favorite people and sites via the Bluesky API.',
  },
  {
    kind: 'person',
    handle: 'brittanyellich.com',
    note: 'crate.social — packing knowledge notes into AT Protocol records on a PDS.',
  },
  {
    kind: 'person',
    handle: 'dame.is',
    note: 'Live status feeds across the atmosphere, including Teal music tracking.',
  },
  {
    kind: 'person',
    handle: 'pds.dad',
    note: 'The Atmosphere Report — personal newspaper built from many lexicons.',
  },
  {
    kind: 'person',
    handle: 'awarm.space',
    note: 'Interactive fiction spaces with objects as AT Protocol records.',
  },
  {
    kind: 'site',
    title: 'AT Protocol Docs',
    url: 'https://atproto.com/docs',
    note: 'Lexicons, PDS, and identity — the foundation for the sections on this site.',
  },
  {
    kind: 'site',
    title: 'teal.fm',
    url: 'https://teal.fm',
    note: 'Music listening as portable AT Proto records.',
  },
  {
    kind: 'site',
    title: 'AIOT Inc',
    url: 'https://www.facebook.com/aiot.global.inc',
    note: 'Where I intern on intelligent systems and software.',
  },
];
