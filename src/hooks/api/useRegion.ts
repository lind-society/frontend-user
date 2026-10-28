import { useGetApi } from './useApi';

export interface Coordinate {
  latitude: number | null;
  longitude: number | null;
}

/**
 * GET /regions/coordinates?shortUrl=<mapLink> — resolves a Google Maps link
 * (short or full) stored on a villa/property/activity into lat/lng, so it can
 * be plotted on the map. Public endpoint.
 */
export const useMapCoordinates = (mapLink?: string | null) =>
  useGetApi<Coordinate>({
    key: ['coordinates', mapLink],
    url: 'regions/coordinates',
    params: { shortUrl: mapLink },
    enabled: Boolean(mapLink),
    // A listing's location doesn't change between page loads.
    staleTime: 30 * 60 * 1000,
  });
