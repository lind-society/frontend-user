import { useQueries } from '@tanstack/react-query';

import { api } from '@/lib/api';

import { MapPin } from '@/components/ui/map-view';

interface PinSource {
  id: string;
  name: string;
  mapLink?: string | null;
}

/**
 * Resolves each listing's `mapLink` (a Google Maps URL) into lat/lng via
 * GET /regions/coordinates, in parallel, and returns only the ones that
 * resolved — so a bad/missing link on one listing doesn't blank the map.
 */
export const useVillaMapPins = (
  sources: PinSource[],
  activeId?: string
): { pins: MapPin[]; isLoading: boolean } => {
  const results = useQueries({
    queries: sources.map((source) => ({
      queryKey: ['coordinates', source.mapLink],
      queryFn: async () => {
        const { data } = await api.get<{
          latitude: number | null;
          longitude: number | null;
        }>('/regions/coordinates', { params: { shortUrl: source.mapLink } });
        return data;
      },
      enabled: Boolean(source.mapLink),
      staleTime: 30 * 60 * 1000,
      retry: false,
    })),
  });

  const pins: MapPin[] = sources
    .map((source, index): MapPin | null => {
      const coords = results[index]?.data;
      if (!coords?.latitude || !coords?.longitude) return null;
      return {
        id: source.id,
        latitude: coords.latitude,
        longitude: coords.longitude,
        label: source.name,
        active: source.id === activeId,
      };
    })
    .filter((pin): pin is MapPin => pin !== null);

  return {
    pins,
    isLoading: results.some((r) => r.isLoading),
  };
};
