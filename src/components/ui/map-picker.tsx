/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/MapPicker.tsx

'use client';

// Fix Leaflet's default icon issue
import L from 'leaflet';
import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { cn } from '@/lib/utils';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  onSelect: (position: [number, number]) => void; // Updated to return tuple
  selectedPosition?: [number, number];
}

const MapPicker: React.FC<MapPickerProps> = ({
  onSelect,
  selectedPosition,
}) => {
  const [position, setPosition] = useState<[number, number] | null>(
    selectedPosition || null
  );

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newPosition: [number, number] = [lat, lng];
        setPosition(newPosition);
        onSelect(newPosition);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <MapContainer
      center={position || [-6.2, 106.816666]} // Default to Jakarta
      zoom={13}
      scrollWheelZoom={false}
      className={cn('h-64 w-full rounded-md border')}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;
