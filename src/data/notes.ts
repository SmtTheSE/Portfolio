/**
 * Local digital-garden notes.
 * Can also live on the PDS as `com.sittminthar.garden.note` records.
 */
export type GardenNote = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  updatedAt: string;
};

export const localNotes: GardenNote[] = [
  {
    id: 'atproto-portfolio',
    title: 'Why AT Protocol on a portfolio',
    body: 'A portfolio should show how you build. Pulling identity, posts, and status from a PDS means the site stays in sync without hand-editing every update — and the data travels with you if the site moves.',
    tags: ['atproto', 'portfolio'],
    updatedAt: '2026-07-23',
  },
  {
    id: 'backend-focus',
    title: 'Backend + data science',
    body: 'I care about structural integrity: clear APIs, solid data pipelines, and systems that stay understandable under load. AI features only help when the substrate is reliable.',
    tags: ['backend', 'data'],
    updatedAt: '2026-07-20',
  },
  {
    id: 'now-page',
    title: 'Keeping a Now page honest',
    body: 'Status drifts if it is only local. Publishing a small custom lexicon record to the PDS lets the site and other apps read the same “what I am doing” fact.',
    tags: ['now', 'lexicon'],
    updatedAt: '2026-07-23',
  },
];
