import pokedexLogo from '../../assets/shared/pokedexLogo.png'
import "./Header.css"
import { HOME, FAVORITES } from '../../utils/Strings';

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <img src={pokedexLogo} className="header-logo" />
            </div>

            <nav className="header-right">
                <button className="nav-btn-active">{HOME}</button>
                <button className="nav-btn">{FAVORITES}</button>
            </nav>
        </header>
    );
}
