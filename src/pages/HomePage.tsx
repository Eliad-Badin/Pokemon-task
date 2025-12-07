import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import "./HomePage.css"

export default function HomePage(){
    return (
        <div className="home-container">
            <Header />
            <div className="home-content">
                <SearchBar />

                <div className="pokemon-grid">
                    <PokemonCard />
                    <PokemonCard />
                    <PokemonCard />
                </div>

                <button className="load-more-btn">Load more...</button>
            </div>
        </div>
    );
}