import { useGetApi } from './useApi';

import { Data, Payload } from '@/types/api/payload';
import { Property, PropertyQuery } from '@/types/api/property';

/** GET /properties — paginated list. Public endpoint. */
export const useProperties = (query: PropertyQuery = {}) =>
  useGetApi<Payload<Data<Property[]>>>({
    key: ['properties', query],
    url: 'properties',
    params: query,
  });

/** GET /properties/:id — single property with its relations. */
export const useProperty = (id?: string) =>
  useGetApi<Payload<Property>>({
    key: ['property', id],
    url: `properties/${id}`,
    enabled: Boolean(id),
  });
