import { useGetApi } from './useApi';

import { Package, PackageQuery } from '@/types/api/package';
import { Data, Payload } from '@/types/api/payload';

/** GET /packages — paginated list. Public endpoint. */
export const usePackages = (query: PackageQuery = {}) =>
  useGetApi<Payload<Data<Package[]>>>({
    key: ['packages', query],
    url: 'packages',
    params: query,
  });

/** GET /packages/:id — single package with its benefits. */
export const usePackage = (id?: string) =>
  useGetApi<Payload<Package>>({
    key: ['package', id],
    url: `packages/${id}`,
    enabled: Boolean(id),
  });
