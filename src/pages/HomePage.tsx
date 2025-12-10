import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import "./HomePage.css"
import { useState, useEffect, useRef, useMemo } from "react";
import type { SimplePokemon } from "../types/PokemonTypes";
import { GetSimplePokemonList } from "../services/api/PokemonApi";
import { filterPokemons } from "../utils/pokemonFilter";

export default function HomePage(){
    const initialLoad = useRef (false);
    const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const limit = 12;
    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const displayedPokemons = useMemo(() => 
        filterPokemons(pokemons, searchTerm), [pokemons, searchTerm]);

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
                <SearchBar onSearch={setSearchTerm} />


            <div className="pokemon-grid">
                {displayedPokemons.map(p => (
                <PokemonCard key={p.id} pokemon={p} />
                ))}
                </div>
            <div className="load-more-wrapper">
                <button onClick={loadMorePokemons} disabled={isLoading} className="load-more-btn">
                {isLoading ? "Loading..." : "Load more..."}
                </button>
            </div>
        </div>
        </div>
    );
}