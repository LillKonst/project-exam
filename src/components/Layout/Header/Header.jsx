
import logo from "../../../images/LOGO4.svg";
import Navbar from "../Header/NavBar/Navbar";
import Searchbar from "../Header/Searchbar/Searchbar";


function Header() {
    return <div className="fixed top-0 left-0 bg-white/50 w-full h-[70px] flex justify-start px-4 z-50">
    <div className="flex w-full justify-start">
        <img src={logo} alt="Logo" className="p-5"/>
        <Navbar className="ms-auto"/>
        <Searchbar className="w-full"/>
    </div>
    </div>
}

export default Header;
