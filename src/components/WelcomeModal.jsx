import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function WelcomeModal({ onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleYes = () => {
    onClose();
    navigate("/Profile");
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome {user.name}
        </h2>
        <p>Would you like to update your profile right away?</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleYes}
            className="py-2 px-4 bg-customBlue text-white rounded-lg hover:bg-blueHover"
          >
            YES
          </button>
          <button
            onClick={handleNo}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
