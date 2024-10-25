
import { useState  } from "react";
import { Link, useLocation } from "react-router-dom"; 
import PropTypes from "prop-types";

export function Home() {
    return <div>Home</div>
}

export function Venues() {
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
         <div className="block md:hidden">
                <button onClick={toggleMenu} className="text-md p-2 bg-customBlue border-none text-bold">
                    MENU
                </button>
            </div>
        <ul className={`${
                    isMenuOpen ? "flex" : "hidden"
                } flex-col items-end md:flex md:flex-row md:space-x-4 
                    absolute md:relative top-[70px] right-0 p-5 rounded md:top-[0px]
                    md:left-auto md:right-auto 
                    bg-customBlue md:bg-transparent md:w-auto 
                     md:items-center md:justify-between`}>
            <li className="px-2">
                <Link to="" onClick={() => setIsMenuOpen(false)}  className={`text-lg ${
                            location.pathname === "/" ? "font-semibold" : ""
                        }`}>HOME</Link>
            </li>
            <li className="px-2">
                <Link to="/Venue" onClick={() => setIsMenuOpen(false)}  className={`text-lg ${
                            location.pathname === "/Venues" ? "font-semibold" : ""
                        }`}>FIND YOUR NEXT HOLIDAZE</Link>
            </li>
            {/* <li className="px-2">
                <Link to="/Profile" onClick={() => setIsMenuOpen(false)}  className={`text-lg ${
                            location.pathname === "/Profile" ? "font-semibold" : ""
                        }`}>PROFILE</Link>
            </li> */}
        </ul>
    </nav>
    );
}

Navbar.propTypes = {
    className: PropTypes.string.isRequired,
  };