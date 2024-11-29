
import { useState  } from "react";
import { Link, useLocation } from "react-router-dom"; 
import PropTypes from "prop-types";

export function Home() {
    return <div>Home</div>
}

export function AllVenues() {
    return <div>Venues</div>
}

// export function Profile() {
//     return <div>Profile</div>
// }

export function RouteNotFound() {
    return <div>Page not found</div>
  }



export default function Navbar({ className }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
    <nav className={`flex ${className}`}>
        <ul className="flex flex-col gap-2 lg:flex-row">
            <li className="px-2">
                <Link to="" onClick={() => setIsMenuOpen(false)}  className={`text-lg text-customBlack ${
                            location.pathname === "/" ? "font-semibold" : ""
                        }`}>HOME</Link>
            </li>
            <li className="text-lg text-customBlack font-semibold hidden lg:block">|</li>
            <li className="px-2">
                <Link to="/AllVenues" onClick={() => setIsMenuOpen(false)}  className={`text-lg text-customBlack ${
                            location.pathname === "/AllVenues" ? "font-semibold" : ""
                        }`}>EXPLORE VENUES</Link>
            </li>
        </ul>
    </nav>
    );
}

Navbar.propTypes = {
    className: PropTypes.string.isRequired,
  };