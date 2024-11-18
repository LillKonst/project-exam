import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Register from "../../../Register/Register";
import Login from "../../../Login/Login";
import { Link } from "react-router-dom";
import WelcomeModal from "../../../WelcomeModal";

export function Profile() {
    return <div>Profile</div>
}

export function RouteNotFound() {
    return <div>Page not found</div>
  }


export default function UserIcon() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isProfilePromptOpen, setIsProfilePromptOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    

    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
    <nav className="flex flex-col items-end">
        <div onClick={toggleMenu} className="relative flex items-center border border-customWhite/50 m-3 mt-4 px-2 py-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list me-1 text-customWhite" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>

            {user ? (
                <img
                    src={user.avatar?.url || "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"}
                    alt="User Avatar"
                    className="w-[20px] h-[20px] rounded-full object-cover"
                />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle text-customWhite" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            )}
        </div>
        <ul className={`${
            isMenuOpen ? "flex" : "hidden"
            } absolute top-12 right-6 mt-5 flex flex-col border border-white shadow-md bg-white rounded-xl`}>
            {!user ? ( 
                    <>
                        <li className="px-3 py-2 hover:bg-gray-200">
                            <button onClick={() => { setIsRegisterOpen(true); setIsMenuOpen(false); }} className="text-md">
                                REGISTER
                            </button>
                        </li>
                        <li className="px-3 py-2 hover:bg-gray-200">
                            <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} className="text-md">
                                LOGIN
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="px-3 py-2 hover:bg-gray-200">
                            <Link to="/Profile" onClick={() => setIsMenuOpen(false)} className="text-md">
                                PROFILE
                            </Link>
                        </li>
                        <li className="px-3 py-2 hover:bg-gray-200">
                            <button onClick={() => { 
                                logout(); 
                                setIsMenuOpen(false); 
                            }} className="text-md">
                                LOGOUT
                            </button>
                        </li>
                    </>
                )}
        </ul>
      

        {isRegisterOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Register onClose={() => setIsRegisterOpen(false)} 
               
              onRegisterSuccess={() => {
                console.log("onRegisterSuccess called");
                  setIsRegisterOpen(false); 
                  setIsProfilePromptOpen(true); 
              }}/>
        </div>
    </div>

)}



            {isLoginOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-md w-full">
                        <Login onClose={() => setIsLoginOpen(false)} /> 
                        <button onClick={() => setIsLoginOpen(false)} className="mt-4 absolute top-4 right-4 px-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}

{isProfilePromptOpen && (
                <WelcomeModal onClose={() => setIsProfilePromptOpen(false)} />
            )}

{isEditProfileOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <EditProfile onClose={() => setIsEditProfileOpen(false)} />
                    </div>
                </div>
            )}
        </nav>
    );
}