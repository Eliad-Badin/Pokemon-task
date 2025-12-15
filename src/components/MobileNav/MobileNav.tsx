import { NavLink } from "react-router-dom";
import "./MobileNav.css";
import { HOME, FAVORITES } from "../../utils/Strings";

export default function MobileNav() {
    return (
        <nav className="mobile-nav">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive ? "mobile-nav-btn-active" : "mobile-nav-btn"
                }
            >
                {HOME}
            </NavLink>

            <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    isActive ? "mobile-nav-btn-active" : "mobile-nav-btn"
                }
            >
                {FAVORITES}
            </NavLink>
        </nav>
    );
}