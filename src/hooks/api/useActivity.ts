import { useGetApi } from './useApi';

import { Activity, ActivityQuery } from '@/types/api/activity';
import { Data, Payload } from '@/types/api/payload';

/** GET /activities — paginated list. Public endpoint. */
export const useActivities = (query: ActivityQuery = {}) =>
  useGetApi<Payload<Data<Activity[]>>>({
    key: ['activities', query],
    url: 'activities',
    params: query,
  });

/** GET /activities/best-seller — curated list for the landing page. */
export const useActivitiesBestSeller = () =>
  useGetApi<Payload<Data<Activity[]>>>({
    key: ['activities', 'best-seller'],
    url: 'activities/best-seller',
  });

/** GET /activities/:id — single activity with its relations. */
export const useActivity = (id?: string) =>
  useGetApi<Payload<Activity>>({
    key: ['activity', id],
    url: `activities/${id}`,
    enabled: Boolean(id),
  });
