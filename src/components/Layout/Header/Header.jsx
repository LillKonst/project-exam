
import logo from "../../../images/holidaze-logo.svg";
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
    <div className="relative top-0 left-0 w-full flex flex-col justify-start items-center z-50 bg-customWhite shadow-sm">
      <div className="bg-customWhite h-[60px] flex z-10 w-full justify-center items-center rounded-lg px-12">
        <div className="flex w-full items-end">
          <Link to="/"><img src={logo} alt="Logo" className="ms-10 h-[35px]"/></Link>
          <Navbar />
          <UserIcon />
        </div>
        <Searchbar className="w-full"/>  
      </div>
      <div className="h-[15px] bg-customYellow w-full text-center text-customRed -mt-2">.</div>
    </div>
  );
  
}

export default Header;
