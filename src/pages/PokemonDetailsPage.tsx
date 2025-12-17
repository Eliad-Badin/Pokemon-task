import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails, getPokemonSpeicies } from "../services/api/PokemonApi";
import type { PokemonFullInfo } from "../types/PokemonTypes";
import PokemonDetailsCard from "../components/PokemonDetailsCard/PokemonDetailsCard";
import Header from "../components/Header/Header";
import "./PokemonDetailsPage.css";
import { mapPokemonData } from "../utils/pokemonMapper";
import PokemonMap from "../components/PokemonMap/PokemonMap";
import { useFavorites } from "../hooks/useFavorites";
import MapModal from "../components/MapModal/MapModal";
import MobileNav from "../components/MobileNav/MobileNav";
import { HOME_PAGE_NAV, SHOW_ON_MAP_BTN, LOADING } from "../utils/Strings";

export default function PokemonDetailsPage() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<PokemonFullInfo | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadPokemon() {
      try {
        setIsLoading(true);
        setError(null);

        if (!id) return;

        const detailsData = await getPokemonDetails(id);
        const speciesData = await getPokemonSpeicies(id);
        setPokemon(mapPokemonData(detailsData, speciesData));
      } catch {
        setError("Failed to load pokemon data");
      } finally {
        setIsLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  if (isLoading) return <p>{LOADING}</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return null;

  const favorite = isFavorite(pokemon.id);

  function handleToggleFavorite() {
    if (pokemon) toggleFavorite(pokemon.id);
  }

  return (
    <div className="details-container">
        <Header />

        <Link to="/" className="back-link">
            {HOME_PAGE_NAV}
        </Link>

        <PokemonDetailsCard
            pokemon={pokemon}
            isFavorite={favorite}
            onToggleFavorite={handleToggleFavorite}
        />
        <div className="show-map-btn-wrapper">
            <button className="show-map-btn" onClick={() => setIsMapOpen(true)}>
                {SHOW_ON_MAP_BTN}
            </button>
        </div>

        <MapModal
        isOpen={isMapOpen}
        title={`${pokemon.name} Location`}
        onClose={() => setIsMapOpen(false)}
        >
            <PokemonMap pokemonLocation={pokemon.location} />
        </MapModal>
    

        <MobileNav />
    </div>
  );
}
