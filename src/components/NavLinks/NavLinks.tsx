import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { HOME, FAVORITES } from "../../utils/Strings";

export default function NavLinks() {
    return (
        <div className="nav-links-wrapper">
            <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `nav-btn ${isActive ? "is-active" : ""}`}
                >
                {HOME}
                </NavLink>

                <NavLink
                    to="/favorites"
                    className={({ isActive }) => `nav-btn ${isActive ? "is-active" : ""}`}
                >
                {FAVORITES}
                </NavLink>
        </div>
    )
}