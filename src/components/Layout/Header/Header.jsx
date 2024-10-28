
import logo from "../../../images/LOGO-HOLIDAZE.png";
import Navbar from "../Header/NavBar/Navbar";
import Searchbar from "../Header/Searchbar/Searchbar";
import UserIcon from "./UserIcon/UserIcon";


function Header() {
    return <div className="fixed top-0 left-0 bg-customBlue/50 w-full h-[70px] flex justify-start px-4 z-50 shadow-sm">
    <div className="flex w-full justify-start">
        <img src={logo} alt="Logo" className="p-5"/>
        <Navbar className="ms-auto"/>
        <Searchbar className="w-full"/>
        <UserIcon />
    </div>
    </div>
}

export default Header;