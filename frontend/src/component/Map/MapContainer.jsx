import React, { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
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
import SearchPlace from "./SearchPLace";
import RouteSearch from "./RoutesSearch";

import { NORMAL_TILES, ROUTE_TILES } from "../../services/mapTiles";

const speak = (text) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1.1;

    window.speechSynthesis.speak(utterance);
  }
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
      .filter((p) => p?.lat && (p?.lng || p?.lon))
      .map((p) => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng ?? p.lon),
        placeType: p.placeType || p.type || "default",
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
    if (!liveLocation || !mapPlaces.length) return;

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
    return mapPlaces.map((p) => (
      <Marker
        key={p.id}
        position={[p.lat, p.lng]}
        icon={icons[p.placeType] || icons.default}
      >
        <Popup>{p.name}</Popup>
      </Marker>
    ));
  }, [mapPlaces]);

  if (!center) {
    return (
      <div className="h-full flex items-center justify-center">
        Initializing Map...
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        preferCanvas={true}
        className="h-full w-full"
      >
        <FixLeafletResize />

        <SearchPlace
          onSearch={(place) => {
            // UPDATE MAP CENTER
            setCenter({
              lat: place.lat,
              lng: place.lng,
            });

            // VERY IMPORTANT
            // UPDATE SELECTED PLACE
            if (setSelectedPlace) {
              setSelectedPlace(place);
            }

            // RESET ROUTE
            setManualRoute(null);
            setNavigationOn(false);

            speak(`Showing nearby places around ${place.name}`);
          }}
        />
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
          >
            <Popup>You are here</Popup>
          </Marker>
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
