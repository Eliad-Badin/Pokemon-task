import pokedexLogo from '../../assets/shared/pokedexLogo.png'
import "./Header.css"
import { HOME, FAVORITES } from '../../utils/Strings';
import { Link, NavLink} from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <Link className="logo-link" to="/">
                <img src={pokedexLogo} className="header-logo" />
                </Link>
            </div>

            <nav className="header-right">
                <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive ? "nav-btn-active" : "nav-btn"
                }
                >
                {HOME}
                </NavLink>

                <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    isActive ? "nav-btn-active" : "nav-btn"
                }
                >
                {FAVORITES}
                </NavLink>
            </nav>
        </header>
    );
}
