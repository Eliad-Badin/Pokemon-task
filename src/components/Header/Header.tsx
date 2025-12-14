import pokedexLogo from '../../assets/shared/pokedexLogo.png'
import "./Header.css"
import { HOME, FAVORITES } from '../../utils/Strings';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <Link to="/">
                <img src={pokedexLogo} className="header-logo" />
                </Link>
            </div>

            <nav className="header-right">
                <button className="nav-btn-active">{HOME}</button>
                <button className="nav-btn">{FAVORITES}</button>
            </nav>
        </header>
    );
}
