import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails, getPokemonSpeicies } from "../services/api/PokemonApi";
import type { PokemonDetailsResponse, PokemonSpeciesResponse, PokemonFullInfo } from "../types/PokemonTypes";
import PokemonDetailsCard from "../components/PokemonDetailsCard/PokemonDetailsCard";
import Header from "../components/Header/Header";
import "./PokemonDetailsPage.css";

export default function PokemonDetailsPage () {
    const { id } = useParams();

    const [details, setDetails] = useState<PokemonDetailsResponse | null>(null);
    const [species, setSpecies] = useState<PokemonSpeciesResponse | null>(null);
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

                setDetails(detailsData);
                setSpecies(speciesData);

                const description =
                    speciesData.flavor_text_entries.find(
                        (entry) => entry.language.name === "en"
                    )?.flavor_text.replace(/\n|\f/g, " ") ??
                    "No description available.";

                const totalStats = detailsData.stats.reduce(
                    (sum, s) => sum + s.base_stat,
                    0
                );

                const fullInfo: PokemonFullInfo = {
                    id: detailsData.id,
                    name: detailsData.name,
                    image: detailsData.sprites.front_default ?? "",
                    types: detailsData.types.map((t) => t.type.name),
                    description,
                    stats: detailsData.stats.map((s) => ({
                        name: s.stat.name,
                        value: s.base_stat,
                    })),
                    totalStats,
                };

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
        </div>
    );
}
