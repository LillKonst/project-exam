
import logo from "../../../images/YELLOW-TENT-LOGO.svg";
import Navbar from "../Header/NavBar/Navbar";
import Searchbar from "../Header/Searchbar/Searchbar";
import UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";

export function Home() {
    return <div>Home</div>
}

export function RouteNotFound() {
    return <div>Page not found</div>
  }

function Header() {
  return (
    <div className="relative top-0 left-0 w-full flex flex-col justify-start items-center z-50 shadow-sm">
      <div className="bg-customWhite h-[60px] flex z-10 w-full justify-center items-center rounded-lg">
        <Link to="/"><img src={logo} alt="Logo" className="mx-3 p-3 h-[60px]"/></Link>
        <Navbar className="ms-auto"/>
        <UserIcon />
        <Searchbar className="w-full"/>  
      </div>
      <div className="h-[15px] bg-customYellow w-full text-center text-customRed -mt-2">.</div>
    </div>
  );
  
}

export default Header;
