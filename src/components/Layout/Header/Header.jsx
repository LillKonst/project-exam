
import logo from "../../../images/thelogo.svg";
import Navbar from "../Header/NavBar/Navbar";
import Searchbar from "../Header/Searchbar/Searchbar";
import UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
import backgroundImage from "../../../images/swimming-pool-2128578_1280 header.jpg";

export function Home() {
    return <div>Home</div>
}

export function RouteNotFound() {
    return <div>Page not found</div>
  }

function Header() {
    return <div className="relative top-0 left-0 w-full h-[70px] flex justify-start items-center px-4 z-50 shadow-sm">
      <img src={backgroundImage} alt="Blue-sky" className="absolute top-0 left-0 w-full h-[70px] object-cover"/>
    <div className="flex z-10 w-full justify-start">
        <Link to="/"><img src={logo} alt="Logo" className="p-3 h-5/6"/></Link>
        <Navbar className="ms-auto"/>
        {/* <Searchbar className="w-full"/> */}
        <UserIcon />
    </div>
    </div>
}

export default Header;
