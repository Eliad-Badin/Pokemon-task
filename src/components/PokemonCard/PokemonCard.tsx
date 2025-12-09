import "./PokemonCard.css";
import type { SimplePokemon } from "../../types/PokemonTypes";
import { Link } from "react-router-dom";

interface PokemonCardProps {
    pokemon: SimplePokemon;
}

export default function PokemonCard({pokemon} : PokemonCardProps) {
  return (
    <Link 
    to={`/pokemon/${pokemon.id}`}
    className="card-link" >
        <div className="pokemon-card">
            <p className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</p>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
    </Link>
  );
}