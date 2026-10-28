import { QueryKey, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface FetchOptions<T> {
  key: QueryKey;
  url: string;
  /** Serialised as query string by axios; plain interfaces are accepted. */
  params?: object;
  gcTime?: number;
  staleTime?: number;
  enabled?: boolean;
  select?: (data: T) => T;
}

const GC_TIME = 30 * 60 * 1000;
const STALE_TIME = 5 * 60 * 1000;

/**
 * Read a public endpoint from the Lind Society backend.
 *
 * Mirrors `useGetApi` in the admin dashboard so both frontends share one
 * mental model. `url` is relative to the API base, e.g. `search` or `villas`.
 */
export const useGetApi = <T>({
  key,
  url,
  params,
  gcTime = GC_TIME,
  staleTime = STALE_TIME,
  enabled = true,
  select,
}: FetchOptions<T>) => {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get(`/${url}`, { params });
      return data;
    },
    gcTime,
    staleTime,
    enabled,
    select,
  });
};
