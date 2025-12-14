import "./PokemonMap.css";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { PokemonLocation } from "../../types/PokemonTypes";
import { usePokemonDirections } from "../../hooks/usePokemonDirections";

interface PokemonMapProps {
  pokemonLocation: PokemonLocation;
}

export default function PokemonMap({ pokemonLocation }: PokemonMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const {
    directions,
    mode,
    isCaulculating,
    error,
    requestDirections,
  } = usePokemonDirections(pokemonLocation);

  if (!isLoaded) return <div>Loading map..</div>;

  return (
    <div className="map-container">
      <div className="map-controls">
        <button
          onClick={() => requestDirections("DRIVING")}
          disabled={isCaulculating}
          className="directions-btn"
        >
          {directions ? "Recalculate directions" : "Directions"}
        </button>

        {directions && (
          <div className="mode-selector">
            <span className="mode-title">Mode:</span>
            <select className="select-menu"
              value={mode}
              onChange={(e) =>
                requestDirections(e.target.value as typeof mode)
              }
            >
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>
        )}

        {error && <div className="map-error">{error}</div>}
      </div>

      <GoogleMap
        zoom={14}
        center={pokemonLocation}
        mapContainerStyle={{ width: "100%", height: "500px" }}
      >

        <Marker position={pokemonLocation} />
        <Marker position={{ lat: 32.064, lng: 34.773 }} />

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
