import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import "./HomePage.css"
import { useState, useEffect, useRef } from "react";
import type { SimplePokemon } from "../types/PokemonTypes";
import { GetSimplePokemonList } from "../services/api/PokemonApi";

export default function HomePage(){
    const initialLoad = useRef (false);
    const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const limit = 12;
    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!initialLoad.current){
            initialLoad.current = true;
            loadMorePokemons();
        }
    }, []);

    async function loadMorePokemons() {
        try {
            setIsLoading(true);
            setError(null);
            const newPokemons = await GetSimplePokemonList(limit, offset);
            setPokemons(prev => [...prev, ...newPokemons]);
            setOffset(prev => prev + limit);
        } catch (err) {
            setError("Failed to load Pokemon. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="home-container">
            <Header />
            <div className="home-content">
                <SearchBar />


            <div className="pokemon-grid">
                {pokemons.map(p => (
                <div key={p.id} className="pokemon-card">
                    <p>#{String(p.id).padStart(3, "0")}</p>
                    <img src={p.image} alt={p.name} />
                    <h3>{p.name}</h3>
                </div>
                ))}
                </div>
            <div className="load-more-wrapper">
                <button onClick={loadMorePokemons} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load more..."}
                </button>
            </div>
        </div>
        </div>
    );
}