import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useLiveLocation from "../../hooks/useLiveLocation";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useInitCenter } from "../../hooks/useInitCenter";
import { useRoute } from "../../hooks/useRoute";
import { usePlacesAlongRoute } from "../../hooks/usePlacesAlongRoute";
import { useMapPlaces } from "../../hooks/useMapPlaces";
import { useFromPoint } from "../../hooks/useFromPoint";
import { useToPoint } from "../../hooks/useToPoint";
import { useRouteLatLng } from "../../hooks/useRouteLatLng";
import { useRemainingRoute } from "../../hooks/useRemainingRoute";
import { FixLeafletResize } from "../../services/FixLeafletResize";
import { icons } from "./MapIcons";
import SearchPlace from "./SearchPLace";
import RouteSearch from "./RoutesSearch";
import { NORMAL_TILES, ROUTE_TILES, MAX_FETCH_RADIUS } from "../../services/mapTiles";

const MapPage = ({ selectedCategory, selectedPlace, center, setCenter, radius }) => {
  const liveLocation = useLiveLocation();
  const [manualRoute, setManualRoute] = useState(null);
  const [navigationOn, setNavigationOn] = useState(false);

  useInitCenter(liveLocation, center, setCenter);

  const fromPoint = useFromPoint(manualRoute, liveLocation);
  const toPoint = useToPoint(manualRoute, selectedPlace);

  const route = useRoute(fromPoint, toPoint);
  const { routeLatLng, hasRoute } = useRouteLatLng(route);

  const remainingRoute = useRemainingRoute(navigationOn, liveLocation, routeLatLng);

  const { data: allPlaces = [] } = useNearbyPlaces(center, MAX_FETCH_RADIUS);
  const mapPlaces = useMapPlaces(allPlaces, selectedCategory, center, radius);
  const placesAlongRoute = usePlacesAlongRoute(hasRoute ? route.coordinates : null);

  if (!center) return <div className="p-4">Loading map…</div>;

  return (
    <div className="h-full w-full relative">
      <MapContainer center={[center.lat, center.lon]} zoom={15} className="h-full w-full">
        <FixLeafletResize />

        <SearchPlace
          onSearch={(place) => {
            // Map 'lng' from search result to 'lon' used by MapContainer state
            setCenter({ lat: place.lat, lon: place.lng ?? place.lon });
            setManualRoute(null);
            setNavigationOn(false);
          }}
        />

        <RouteSearch
          liveLocation={liveLocation}
          onRoute={(from, to) => {
            setManualRoute({
              from: { lat: from.lat, lng: from.lng ?? from.lon },
              to: { lat: to.lat, lng: to.lng ?? to.lon },
            });
            setNavigationOn(false);
          }}
        />

        <TileLayer url={hasRoute ? ROUTE_TILES : NORMAL_TILES} />

        <Circle
          center={[center.lat, center.lon]}
          radius={radius}
          pathOptions={{ color: "#2563eb", fillOpacity: 0.05 }}
        />

        {liveLocation && (
          <Marker position={[liveLocation.lat, liveLocation.lng]} icon={icons.user || icons.default}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {mapPlaces.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lon]} icon={icons[p.placeType] || icons.default}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}

        {hasRoute && (
          <Polyline
            positions={(navigationOn ? remainingRoute : routeLatLng).map((p) => [p.lat, p.lng])}
            pathOptions={{ color: "#2563eb", weight: 6 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;