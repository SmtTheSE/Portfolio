import { useEffect, useState } from 'react';
import {
  fetchAtmosphereDigest,
  fetchAuthorFeed,
  fetchFollows,
  fetchGardenNotes,
  fetchGardenPeople,
  fetchLatestTealPlay,
  fetchProfile,
  resolveNowStatus,
  type DigestItem,
  type PortfolioFollow,
  type PortfolioPost,
  type PortfolioProfile,
  type TealPlay,
} from '../lib/atproto/api';
import { hasAtprotoActor } from '../lib/atproto/client';
import type { NowStatus } from '../data/now';
import { nowStatus as localNow } from '../data/now';
import type { GardenNote } from '../data/notes';
import { localNotes } from '../data/notes';
import { gardenEntries } from '../data/garden';

type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

export function useAtprotoProfile() {
  const [state, setState] = useState<AsyncState<PortfolioProfile | null>>({
    data: null,
    loading: hasAtprotoActor(),
    error: null,
  });

  useEffect(() => {
    if (!hasAtprotoActor()) return;
    let cancelled = false;
    fetchProfile()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load AT Protocol profile',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useAtprotoFeed() {
  const [state, setState] = useState<AsyncState<PortfolioPost[]>>({
    data: [],
    loading: hasAtprotoActor(),
    error: null,
  });

  useEffect(() => {
    if (!hasAtprotoActor()) return;
    let cancelled = false;
    fetchAuthorFeed()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load activity feed',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useAtprotoFollows() {
  const [state, setState] = useState<AsyncState<PortfolioFollow[]>>({
    data: [],
    loading: hasAtprotoActor(),
    error: null,
  });

  useEffect(() => {
    if (!hasAtprotoActor()) return;
    let cancelled = false;
    fetchFollows()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load network',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useNowStatus() {
  const [state, setState] = useState<AsyncState<NowStatus & { source: 'pds' | 'local' }>>({
    data: { ...localNow, source: 'local' },
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    resolveNowStatus()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ data: { ...localNow, source: 'local' }, loading: false, error: null });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useTealListening() {
  const [state, setState] = useState<AsyncState<TealPlay | null>>({
    data: null,
    loading: hasAtprotoActor(),
    error: null,
  });

  useEffect(() => {
    if (!hasAtprotoActor()) return;
    let cancelled = false;
    fetchLatestTealPlay()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, loading: false, error: null });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useGardenNotes() {
  const [state, setState] = useState<AsyncState<{ notes: GardenNote[]; source: 'pds' | 'local' }>>({
    data: { notes: localNotes, source: 'local' },
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetchGardenNotes()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ data: { notes: localNotes, source: 'local' }, loading: false, error: null });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useCommunityGarden() {
  const people = gardenEntries.filter((e) => e.kind === 'person');
  const sites = gardenEntries.filter((e) => e.kind === 'site');
  const [state, setState] = useState<
    AsyncState<{ handle: string; profile: PortfolioProfile | null; note: string }[]>
  >({
    data: people.map((p) => ({ handle: p.handle, profile: null, note: p.note })),
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const peopleList = gardenEntries.filter((e) => e.kind === 'person');
    fetchGardenPeople(peopleList.map((p) => p.handle))
      .then((results) => {
        if (cancelled) return;
        setState({
          data: results.map((r) => ({
            handle: r.handle,
            profile: r.profile,
            note: peopleList.find((p) => p.handle === r.handle)?.note || '',
          })),
          loading: false,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load garden',
          }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { people: state, sites };
}

export function useAtmosphereDigest() {
  const [state, setState] = useState<AsyncState<DigestItem[]>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const handles = gardenEntries.filter((e) => e.kind === 'person').map((p) => p.handle);
    fetchAtmosphereDigest(handles)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load digest',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
