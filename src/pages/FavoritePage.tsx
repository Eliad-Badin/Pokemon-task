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

export default function FavoritePage() {
    const {favoriteIds, toggleFavorite} = useFavorites();
    const [favoritePokemons, setFavoritePokemons] = useState<SimplePokemon[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadFavorites() {
            setIsLoading(true);
            try {
                const details = await Promise.all(
                    favoriteIds.map(id => getPokemonDetails(id))
                );
                setFavoritePokemons(details.map(mapToSimplePokemon));
            } finally{
                setIsLoading(false);
            }
        }

        loadFavorites();
    }, [favoriteIds]);

    function removeFromFavorites(id: number) {
        toggleFavorite(id);
    }

    return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        

        {isLoading ? (
          <p>Loading...</p>
        ) : favoritePokemons.length === 0 ? (
          <p>Favorite List is Empty</p>
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

