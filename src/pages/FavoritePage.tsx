import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import type { SimplePokemon } from "../types/PokemonTypes";
import { getPokemonDetails } from "../services/api/PokemonApi";
import { useFavorites } from "../hooks/useFavorites";
import { mapToSimplePokemon } from "../utils/pokemonMapper";
import "./FavoritePage.css";
import "./HomePage.css";
import MobileNav from "../components/MobileNav/MobileNav";
import { LOADING, NO_FAVORITES } from "../utils/Strings";

export default function FavoritePage() {
    const {favoriteIds, toggleFavorite} = useFavorites();
    const [favoritePokemons, setFavoritePokemons] = useState<SimplePokemon[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let canceled = false;

        async function loadFavorites() {
            setIsLoading(true);
            try {
                const details = await Promise.all(
                    favoriteIds.map(id => getPokemonDetails(id))
                );
                if (!canceled) {
                    setFavoritePokemons(details.map(mapToSimplePokemon));
                }
            } finally{
                if (!canceled) {
                    setIsLoading(false);
                }
            }
        }

        if (favoriteIds.length === 0) {
            setFavoritePokemons([]);
            return;
        }

        loadFavorites();
        return () => { canceled = true; };
    }, [favoriteIds]);

    function removeFromFavorites(id: number) {
        toggleFavorite(id);
    }

    return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        

        {isLoading ? (
          <p>{LOADING}</p>
        ) : favoritePokemons.length === 0 ? (
          <p>{NO_FAVORITES}</p>
        ) : (
          <div className="pokemon-grid">
            {favoritePokemons.map((pokemon) => (
              <div key={pokemon.id} className="favorite-card-wrapper">


                <PokemonCard 
                    pokemon={pokemon} 
                    onRemove={() => removeFromFavorites(pokemon.id)}/>
              </div>
            ))}
          </div>
        )}
      </div>
      <MobileNav />
    </div>

    );
}

