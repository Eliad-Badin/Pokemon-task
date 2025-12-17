import { NavLink } from "react-router-dom";
import "./MobileNav.css";
import { HOME, FAVORITES } from "../../utils/Strings";
import NavLinks from "../NavLinks/NavLinks";

export default function MobileNav() {
    return (
        <nav className="mobile-nav">
            <NavLinks />
        </nav>
    );
}