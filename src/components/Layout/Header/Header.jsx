
import logo from "../../../images/BIGRAYS.png";
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
    return <div className="fixed top-0 left-0 bg-white/50 w-full h-[70px] flex justify-start px-4 z-50 shadow-sm">
    <div className="flex w-full justify-start">
        <Link to="/"><img src={logo} alt="Logo" className="p-3 h-full"/></Link>
        <Navbar className="ms-auto"/>
        <Searchbar className="w-full"/>
        <UserIcon />
    </div>
    </div>
}

export default Header;
