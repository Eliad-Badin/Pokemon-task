import "./PokemonDetailsCard.css";
import type { PokemonFullInfo } from "../../types/PokemonTypes";
import HeartEmpty from '../../assets/shared/heart-white.png';
import HeartFilled from '../../assets/shared/heart-red.png';

interface PokemonDetailsCardProps {
    pokemon: PokemonFullInfo;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function PokemonDetailsCard({
    pokemon,
    isFavorite,
    onToggleFavorite,
}: PokemonDetailsCardProps) {
    return (
        <div className="pokemon-details-card">

            <div className="details-header">
                <span className="pokemon-id">
                    #{String(pokemon.id).padStart(3, "0")}
                </span>

                <img
                    src={isFavorite ? HeartFilled : HeartEmpty}
                    alt="favorite toggle"
                    className="favorite-icon"
                    onClick={onToggleFavorite}
                />
            </div>

            <div className="details-content">

                <div className="left-side">
                    <div className="image-wrapper">
                        <img src={pokemon.image} className="details-image" />
                    </div>
                    <h2 className="details-name">{pokemon.name}</h2>
                    <div className="types-row">
                        {pokemon.types.map((t) => (
                            <span key={t} className={`type-badge ${t}`}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="vertical-divider"></div>
                <div className="horizontal-divider"/>

                <div className="right-side">
                    <h3 className="description-title">Description</h3>
                    <p className="description-text">{pokemon.description}</p>

                    <h3 className="stats-title">Stats</h3>
                    <div className="stats-grid">
                        {pokemon.stats.map((stat) => (
                            <p key={stat.name} className="stats-single">
                                {stat.name}:  {stat.value}
                            </p>
                        ))}
                        <p className="stats-single">
                            Total: {pokemon.totalStats}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}