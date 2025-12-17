import { useState } from "react";
import type { PokemonLocation } from "../types/PokemonTypes";

export type TravelModeName = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

const MOVE_OFFICE = { lat: 32.064, lng: 34.773 };

interface UsePokemonDirectionsResult {
    directions: google.maps.DirectionsResult | null;
    mode: TravelModeName;
    isCaulculating: boolean;
    error: string | null;
    requestDirections: (mode: TravelModeName) => void;
}

export function usePokemonDirections(
    origin: PokemonLocation | null
): UsePokemonDirectionsResult {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [mode, setMode] = useState<TravelModeName>("DRIVING");
    const [isCaulculating, setIsCalculating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    function requestDirections(selectedMode: TravelModeName) { 
        if (!origin) {
            setError("Origin location is not available");
            return;
        }
        const g = (window as any).google as typeof google | undefined;
        if (!g) {
            setError("Google Maps API is not loaded");
            return;
        }

        const finalMode = selectedMode ?? mode;
        setMode(finalMode);
        setIsCalculating(true);
        setError(null);

        const travelMode = g.maps.TravelMode[finalMode];
        const directionsService = new g.maps.DirectionsService();

        directionsService.route(
            {
                origin,
                destination: MOVE_OFFICE,
                travelMode,
            },
            (result, status) => {
                setIsCalculating(false);
                if (status === g.maps.DirectionsStatus.OK && result) {
                    setDirections(result);
                } else {
                    setError(`Directions request failed due to ${status}`);
                }
            }
        );
    }
    
    return { directions, mode, isCaulculating, error, requestDirections };
}
    