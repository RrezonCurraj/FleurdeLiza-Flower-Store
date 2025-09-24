"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
}

export default function GoogleMap({
  center,
  zoom = 15,
  className = "",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY",
          version: "weekly",
          libraries: ["places"],
        });

        const { Map } = await loader.importLibrary("maps");
        const { Marker } = await loader.importLibrary("marker");

        // Create the map
        const map = new Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: "roadmap",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add marker
        new Marker({
          position: center,
          map,
          title: "Fleur de Liza - Blumenladen",
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        // Fallback to placeholder if API key is not available
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gradient-to-br from-brand-light/30 to-brand/50">
              <div class="text-center">
                <span class="text-4xl mb-2 block">🗺️</span>
                <p class="text-brand-dark font-semibold">Google Maps</p>
                <p class="text-sm text-dark-200">API-Schlüssel erforderlich</p>
              </div>
            </div>
          `;
        }
      }
    };

    initMap();
  }, [center, zoom]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}
