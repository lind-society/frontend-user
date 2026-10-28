import { useGetApi } from './useApi';

import { Data, Payload } from '@/types/api/payload';
import { SearchEntity, SearchQuery } from '@/types/api/search';

/**
 * Query the public GET /search endpoint.
 *
 * Disabled until `name` has at least `minLength` characters so typing in the
 * search bar does not fire a request per keystroke prefix.
 */
export const useSearch = (query: SearchQuery, minLength = 2) => {
  const term = query.name?.trim() ?? '';

  return useGetApi<Payload<Data<SearchEntity[]>>>({
    key: ['search', query],
    url: 'search',
    params: query,
    enabled: term.length >= minLength,
    staleTime: 60 * 1000,
  });
};
