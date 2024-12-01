import CastleImg from "../../../images/castle.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import Register from "../../Register/Register";
import Login from "../../Login/Login";

export default function RegisterVenueLink() {
  const { user } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      setIsRegisterOpen(true);
    }
  };

  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };
  const openLoginModal = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <Link
        to="/RegisterVenue"
        onClick={handleClick}
        className="relative col-span-12 sm:col-span-6"
      >
        <img
          src={CastleImg}
          alt="A white big house with modern features"
          className="relative top-0 left-0 w-full max-h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-2 md:p-5 rounded-lg bg-customWhite/50">
          <h2 className="text-xl xxs:text-3xl sm:text-2xl font-semibold">
            REGISTER A VENUE
          </h2>
        </div>
      </Link>

      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-customWhite p-6 rounded-lg shadow-lg max-w-md w-full">
            <Register
              onClose={() => setIsRegisterOpen(false)}
              onRegisterSuccess={() => {
                setIsRegisterOpen(false);
                setIsProfilePromptOpen(true);
              }}
              openLogin={openLoginModal}
            />
          </div>
        </div>
      )}

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-md w-full">
            <Login
              onClose={() => setIsLoginOpen(false)}
              openRegister={openRegisterModal}
            />
            <button
              onClick={() => setIsLoginOpen(false)}
              className="m-4 text-2xl absolute top-4 right-4 px-4 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
