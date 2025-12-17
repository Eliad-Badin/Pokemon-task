import pokedexLogo from '../../assets/shared/pokedexLogo.png'
import "./Header.css"
import { HOME, FAVORITES } from '../../utils/Strings';
import { Link, NavLink} from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <Link className="logo-link" to="/">
                <img src={pokedexLogo} className="header-logo" />
                </Link>
            </div>

            <nav className="header-right">
                <NavLinks />
            </nav>
        </header>
    );
}
