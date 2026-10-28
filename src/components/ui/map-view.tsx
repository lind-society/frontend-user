'use client';

import L from 'leaflet';
import React, { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

export interface MapPin {
  id: string;
  latitude: number;
  longitude: number;
  label: string;
  active?: boolean;
}

interface MapViewProps {
  pins: MapPin[];
  className?: string;
  onPinClick?: (id: string) => void;
}

const DEFAULT_CENTER: [number, number] = [-8.4095, 115.1889]; // Bali, fallback when there's nothing to plot yet

const pinIcon = (active?: boolean) =>
  L.divIcon({
    className: '',
    html: `<span class="block h-4 w-4 rounded-full border-2 border-cream shadow ${
      active ? 'bg-bronze-600 scale-125' : 'bg-ink'
    }"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

/**
 * Real map (OpenStreetMap via Leaflet) for listing results and detail pages —
 * replaces the earlier static background-image placeholder with random pins.
 *
 * Leaflet touches `window` on import, so every caller must load this via
 * `next/dynamic(() => import('@/components/ui/map-view'), { ssr: false })`.
 */
const MapView = ({ pins, className, onPinClick }: MapViewProps) => {
  const center = useMemo<[number, number]>(() => {
    if (pins.length === 0) return DEFAULT_CENTER;
    const active = pins.find((pin) => pin.active) ?? pins[0];
    return [active.latitude, active.longitude];
  }, [pins]);

  return (
    <MapContainer
      center={center}
      zoom={pins.length > 0 ? 12 : 9}
      scrollWheelZoom={false}
      className={className ?? 'h-full w-full'}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.latitude, pin.longitude]}
          icon={pinIcon(pin.active)}
          eventHandlers={
            onPinClick ? { click: () => onPinClick(pin.id) } : undefined
          }
        >
          <Popup>{pin.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
