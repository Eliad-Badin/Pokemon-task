import "./PokemonMap.css"
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import type { PokemonLocation } from "../../types/PokemonTypes";

interface PokemonMapProps {
    pokemonLocation: PokemonLocation;
}

const MOVEO_OFFICE = { lat: 32.064, lng: 34.773 };

export default function PokemonMap({ pokemonLocation }: PokemonMapProps) {
    const {isLoaded} = useJsApiLoader ({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, 
    });

    if (!isLoaded) return <div>Loading map..</div>

    return(
        <div>
            <GoogleMap 
                zoom={14}
                center={pokemonLocation}
                mapContainerStyle={{width: "90%", height: "400px"}}
                >
                <Marker position={pokemonLocation} />    
                <Marker position={MOVEO_OFFICE} />    
            </GoogleMap>
        </div>
    )
}
