import { useEffect, useState } from 'react';
import {
  fetchAuthorFeed,
  fetchFollows,
  fetchProfile,
  resolveNowStatus,
  type PortfolioFollow,
  type PortfolioPost,
  type PortfolioProfile,
} from '../lib/atproto/api';
import { hasAtprotoActor } from '../lib/atproto/client';
import type { NowStatus } from '../data/now';
import { nowStatus as localNow } from '../data/now';

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
