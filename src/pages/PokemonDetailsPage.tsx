import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails, getPokemonSpeicies } from "../services/api/PokemonApi";
import type { PokemonDetailsResponse, PokemonSpeciesResponse, PokemonFullInfo } from "../types/PokemonTypes";
import PokemonDetailsCard from "../components/PokemonDetailsCard/PokemonDetailsCard";
import Header from "../components/Header/Header";
import "./PokemonDetailsPage.css";
import { mapPokemonData } from "../utils/pokemonMapper";
import PokemonMap from "../components/PokemonMap/PokemonMap";

export default function PokemonDetailsPage () {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [pokemon, setPokemon] = useState<PokemonFullInfo | null>(null);

    useEffect(() => {
        async function loadPokemon() {
            try {
                setIsLoading(true);
                setError(null);

                if (!id) return;

                const detailsData = await getPokemonDetails(id);
                const speciesData = await getPokemonSpeicies(id);
                const fullInfo = mapPokemonData(detailsData, speciesData);
                
                setPokemon(fullInfo);

            } catch (err) {
                setError("Failed to load pokemon data");
            } finally {
                setIsLoading(false);
            }
        }

        loadPokemon();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!pokemon) return null; 

    function toggleFavorite() {
        setIsFavorite((prev) => !prev);
    }

    return (
        <div>
            <Header />
            <Link to="/" className="back-link">
                ← Home page
            </Link>

            <PokemonDetailsCard
                pokemon={pokemon}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
            />
            <PokemonMap pokemonLocation={pokemon.location}/>
        </div>
    );
}
