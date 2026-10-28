import { useGetApi } from './useApi';

import { Data, Payload } from '@/types/api/payload';
import { Villa, VillaQuery } from '@/types/api/villa';

/** GET /villas — paginated list. Public endpoint. */
export const useVillas = (query: VillaQuery = {}) =>
  useGetApi<Payload<Data<Villa[]>>>({
    key: ['villas', query],
    url: 'villas',
    params: query,
  });

/** GET /villas/best-seller — curated list for the landing page. */
export const useVillasBestSeller = () =>
  useGetApi<Payload<Data<Villa[]>>>({
    key: ['villas', 'best-seller'],
    url: 'villas/best-seller',
  });

/** GET /villas/:id — single villa with its relations. */
export const useVilla = (id?: string) =>
  useGetApi<Payload<Villa>>({
    key: ['villa', id],
    url: `villas/${id}`,
    enabled: Boolean(id),
  });
