import "./PokemonMap.css"
import {GoogleMap, Marker, useJsApiLoader, DirectionsRenderer} from "@react-google-maps/api";
import type { PokemonLocation } from "../../types/PokemonTypes";
import { useState } from "react";

interface PokemonMapProps {
    pokemonLocation: PokemonLocation;
}

const MOVEO_OFFICE = { lat: 32.064, lng: 34.773 };

export default function PokemonMap({ pokemonLocation }: PokemonMapProps) {
    const {isLoaded} = useJsApiLoader ({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, 
    });
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

    function calculateRoute(
        mode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
    ) {
        if (!pokemonLocation) return;
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: pokemonLocation,
                destination: MOVEO_OFFICE,
                travelMode: mode,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirectionsResponse(result);
                } else {
                    console.error("Directions request failed due to ",  status);
                }
            }
        );
    }

    if (!isLoaded) return <div>Loading map..</div>

    return(
        <div className="map-container">
            <div className="map-controls">
                <button onClick={() => calculateRoute(google.maps.TravelMode.DRIVING)}>Driving</button>
                <button onClick={() => calculateRoute(google.maps.TravelMode.WALKING)}>Walking</button>
                <button onClick={() => calculateRoute(google.maps.TravelMode.BICYCLING)}>Bicycling</button>
                <button onClick={() => calculateRoute(google.maps.TravelMode.TRANSIT)}>Transit</button>
            </div>
            <GoogleMap 
                zoom={14}
                center={pokemonLocation}
                mapContainerStyle={{width: "90%", height: "400px"}}
                >
                <Marker position={pokemonLocation} />    
                <Marker position={MOVEO_OFFICE} />    

                {directionsResponse && (
                    <DirectionsRenderer 
                        directions={directionsResponse}
                        options={{suppressMarkers: true}} />
                )}
            </GoogleMap>
            
        </div>
    )
}
