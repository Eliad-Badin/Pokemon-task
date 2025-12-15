import "./PokemonCard.css";
import type { SimplePokemon } from "../../types/PokemonTypes";
import { Link } from "react-router-dom";
import removeIcon from "../../assets/shared/removeButton.svg";

interface PokemonCardProps {
    pokemon: SimplePokemon;
    onRemove? : () => void;
}

export default function PokemonCard({pokemon, onRemove} : PokemonCardProps) {
  return (
    <Link 
    to={`/pokemon/${pokemon.id}`}
    className="card-link" >
        <div className="pokemon-card">
          <div className="card-header">
            <p className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</p>
            {onRemove && (
              <button
                className="remove-icon-btn"
                aria-label="Remove from favorites"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation
                  onRemove();
                }}>
                <img src={removeIcon} alt="Remove icon" className="remove-icon" />
                </button>
          )}
          </div>

           
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
    </Link>
  );
}