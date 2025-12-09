import pokedexLogo from '../../assets/shared/pokedexLogo.png'
import "./Header.css"

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <img src={pokedexLogo} className="header-logo" />
            </div>

            <nav className="header-right">
                <button className="nav-btn-active">Home</button>
                <button className="nav-btn">Favorites</button>
            </nav>
        </header>
    );
}
