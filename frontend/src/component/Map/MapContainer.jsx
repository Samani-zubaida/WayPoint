import React, { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
  Circle,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import useLiveLocation from "../../hooks/useLiveLocation";
import { useInitCenter } from "../../hooks/useInitCenter";
import { useRoute } from "../../hooks/useRoute";
import { useMapPlaces } from "../../hooks/useMapPlaces";
import { useFromPoint } from "../../hooks/useFromPoint";
import { useToPoint } from "../../hooks/useToPoint";
import { useRouteLatLng } from "../../hooks/useRouteLatLng";
import { useRemainingRoute } from "../../hooks/useRemainingRoute";

import { FixLeafletResize } from "../../services/FixLeafletResize";

import { icons } from "./MapIcons";
import SearchPlace from "./SearchPlace.jsx";
import RouteSearch from "./RoutesSearch";
import MapUpdater from "./MapUpdater";

import { NORMAL_TILES, ROUTE_TILES } from "../../services/mapTiles";

const speak = (text) => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.1;

  window.speechSynthesis.speak(utterance);
};

const MapView = ({
  places,
  selectedCategory,
  selectedPlace,
  setSelectedPlace,
  center,
  setCenter,
  radius,
}) => {
  const liveLocation = useLiveLocation();

  const [manualRoute, setManualRoute] = useState(null);
  const [navigationOn, setNavigationOn] = useState(false);

  const [announcedIds, setAnnouncedIds] = useState(new Set());

  useInitCenter(liveLocation, center, setCenter);

  const fromPoint = useFromPoint(manualRoute, liveLocation);

  const toPoint = useToPoint(manualRoute, selectedPlace);

  const route = useRoute(fromPoint, toPoint);

  const { routeLatLng, hasRoute } = useRouteLatLng(route);

  const remainingRoute = useRemainingRoute(
    navigationOn,
    liveLocation,
    routeLatLng,
  );

  const normalizedPlaces = useMemo(() => {
    return places
      .filter(
        (p) =>
          p &&
          p.lat !== undefined &&
          (p.lng !== undefined || p.lon !== undefined),
      )
      .map((p) => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng ?? p.lon),
        placeType: p.placeType ?? p.type ?? "default",
      }));
  }, [places]);

  const mapPlaces = useMapPlaces(
    normalizedPlaces,
    selectedCategory,
    center,
    radius,
  );

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!liveLocation) return;
    if (!mapPlaces.length) return;

    mapPlaces.forEach((place) => {
      const distSq =
        (liveLocation.lat - place.lat) ** 2 +
        (liveLocation.lng - place.lng) ** 2;

      if (distSq < 0.00000064 && !announcedIds.has(place.id)) {
        speak(`${place.name} nearby`);

        setAnnouncedIds((prev) => {
          const next = new Set(prev);
          next.add(place.id);
          return next;
        });
      }
    });
  }, [liveLocation, mapPlaces, announcedIds]);

  const markers = useMemo(() => {
    return mapPlaces.map((place) => (
      <Marker
        key={place.id}
        position={[place.lat, place.lng]}
        icon={icons[place.placeType] ?? icons.default}
        eventHandlers={{
          click: () => {
            setSelectedPlace(place);

            setCenter({
              lat: place.lat,
              lng: place.lng,
            });
          },
        }}
      >
        <Popup>
          <div className="min-w-[180px]">
            <h3 className="font-semibold text-base">{place.name}</h3>

            <p className="text-gray-500 capitalize">
              {place.placeType.replace(/_/g, " ")}
            </p>
          </div>
        </Popup>
      </Marker>
    ));
  }, [mapPlaces, setCenter, setSelectedPlace]);

  if (!center) {
    return (
      <div className="flex h-full items-center justify-center">
        Initializing Map...
      </div>
    );
  }

  console.log("Center:", center);
console.log("Live:", liveLocation);


  return (
    <div className="relative h-full w-full">
      {/* Search bar outside */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[2000]">
        <SearchPlace
          onSearch={(place) => {
            setCenter({
              lat: place.lat,
              lng: place.lng,
            });

            setSelectedPlace(place);

            setManualRoute(null);
            setNavigationOn(false);

            speak(`Showing nearby places around ${place.name}`);
          }}
        />
      </div>

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={16}
        className="h-full w-full"
        zoomControl={false}
      >
        <FixLeafletResize />

        <MapUpdater center={center} />

        {/* KEEP THIS INSIDE */}
        <RouteSearch
          liveLocation={liveLocation}
          onRoute={(from, to) => {
            setManualRoute({
              from: {
                lat: from.lat,
                lng: from.lng ?? from.lon,
              },
              to: {
                lat: to.lat,
                lng: to.lng ?? to.lon,
              },
            });

            setNavigationOn(true);

            speak("Navigation started");
          }}
        />

        <TileLayer url={hasRoute ? ROUTE_TILES : NORMAL_TILES} />

        {liveLocation && (
          <Marker
            position={[liveLocation.lat, liveLocation.lng]}
            icon={icons.user}
          />
        )}
        {center && (
          <Circle
            center={[center.lat, center.lng]}
            radius={radius}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.12,
              weight: 2,
            }}
          />
        )}
        {markers}

        {hasRoute && (
          <Polyline
            positions={(navigationOn ? remainingRoute : routeLatLng).map(
              (p) => [p.lat, p.lng],
            )}
            pathOptions={{
              color: "#2563eb",
              weight: 6,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default React.memo(MapView);
