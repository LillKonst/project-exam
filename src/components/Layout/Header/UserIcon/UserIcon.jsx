import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Register from "../../../Register/Register";
import Login from "../../../Login/Login";
import { Link } from "react-router-dom";
import WelcomeModal from "../../../WelcomeModal";
import useLogout from "../../../../hooks/useLogout";

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
    

    const { user } = useAuth();
    const logout  = useLogout();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
    <nav className="flex flex-col items-end relative ms-auto">
        <div onClick={toggleMenu} className="flex items-center px-2 py-2">
                 {user ? (
              <div className="flex gap-1 justify-center items-center">
                <img
                    src={user.avatar?.url || "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"}
                    alt="User Avatar"
                    className="w-[20px] h-[20px] rounded-full object-cover"
                />

                <p className="text-lg">{user.name}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-down-fill text-gray-600" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
                
              </div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle text-customBlack" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            )}
        </div>
        <ul className={`${
            isMenuOpen ? "flex" : "hidden"
            } absolute top-12 right-1 flex flex-col shadow-md bg-customWhite rounded-xl`}>
            {!user ? ( 
                    <div className="p-3">
                        <li className="px-3 py-2 hover:font-semibold">
                            <button onClick={() => { setIsRegisterOpen(true); setIsMenuOpen(false); }} className="text-md">
                                REGISTER
                            </button>
                        </li>
                        <li className="px-3 py-2 hover:font-semibold">
                            <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} className="text-md">
                                LOGIN
                            </button>
                        </li>
                    </div>
                ) : (
                    <div className="p-3">
                        <li className="px-3 py-2 hover:font-semibold text-lg">
                            <Link to="/Profile" onClick={() => setIsMenuOpen(false)} className="text-md">
                                PROFILE
                            </Link>
                        </li>
                        <li className="px-3 py-2 hover:font-semibold text-lg">
                          <Link to="/RegisterVenue" onClick={() => setIsMenuOpen(false)} className="text-md whitespace-nowrap">
                            REGISTER VENUE
                          </Link>
                        </li>
                        <li className="px-3 py-2 mt-3 hover:font-semibold">
                            <button onClick={() => { 
                                logout(); 
                                setIsMenuOpen(false); 
                            }} className="text-md">
                                LOGOUT
                            </button>
                        </li>
                    </div>
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