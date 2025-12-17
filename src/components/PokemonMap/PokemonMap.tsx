import "./PokemonMap.css";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { PokemonLocation } from "../../types/PokemonTypes";
import { usePokemonDirections } from "../../hooks/usePokemonDirections";
import { useState } from "react";
import type { TravelModeName } from "../../hooks/usePokemonDirections";

const modeLabel = (m: TravelModeName) => {
    return m[0] + m.slice(1).toLowerCase();
}

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

  const [open, setOpen] = useState(false);

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

        <div className="dropdown">
        <button
            type="button"
            className="dropdown-btn"
            onClick={() => setOpen((v) => !v)}
        >
            {modeLabel(mode)}
            <span className="dropdown-caret">▾</span>
        </button>

        {open && (
            <div className="dropdown-menu">
            {(["DRIVING", "WALKING", "BICYCLING", "TRANSIT"] as const).map((m) => (
                <button
                key={m}
                type="button"
                className="dropdown-item"
                onClick={() => {
                    requestDirections(m);
                    setOpen(false);
                }}
                >
                {modeLabel(m)}
                </button>
            ))}
            </div>
        )}
        </div>
    </div>
        )}

        {error && <div className="map-error">{error}</div>}
      </div>
    <div className="map-wrapper">
        <GoogleMap
            zoom={14}
            center={pokemonLocation}
            mapContainerStyle={{ width: "100%", height: "min(55vh, 420px)" }}
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
    </div>
  );
}
