import logo from "../../../images/holidaze-logo.svg";
import Navbar from "../Header/NavBar/Navbar";
import Searchbar from "../Header/Searchbar/Searchbar";
import UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Home() {
  return <div>Home</div>;
}

export function RouteNotFound() {
  return <div>Page not found</div>;
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative top-0 left-0 w-full flex flex-col justify-start items-center z-50 bg-customWhite shadow-sm">
      <div className="bg-customWhite h-[70px] flex z-10 w-full justify-between lg:justify-start items-center rounded-lg px-12 pb-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="mt-4 h-[35px]" />
        </Link>

        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-md p-2 bg-customRed rounded-md border-none mt-3 text-customWhite font-semibold"
          >
            MENU
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden lg:flex"
          } absolute lg:static top-[77px] left-50 right-0 h-screen p-5 lg:p-0 
                       rounded lg:ms-5
                     bg-customWhite lg:bg-transparent lg:w-full
                      border-b-4 border-customYellow lg:border-none lg:space-x-4 `}
        >
          <div className="flex flex-col items-start lg:flex-row lg:items-center w-full">
            <Navbar className="lg:mt-5" />
            <UserIcon />
            <Searchbar className="w-full lg:mt-4" />
          </div>
        </div>
      </div>
      <div className="h-[15px] bg-customYellow w-full text-center text-customRed -mt-2">
        .
      </div>
    </div>
  );
}

export default Header;
