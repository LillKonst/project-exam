import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import EditProfile from "../EditProfile/EditProfile";

export default function ProfileInfo() {
  const { user, isVenueManager } = useAuth();
  console.log(user, isVenueManager);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  if (!user) {
    return <div>No user information available.</div>;
  }

  const userData = user;

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const onClose = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-3/4 relative md:p-3 md:m-3">
      <div className="flex gap-2">
        {userData.avatar && userData.avatar.url && (
          <img
            src={userData.avatar.url}
            alt={userData.avatar.alt || "User Avatar"}
            className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-full mb-4 m-2 lg:m-4"
          />
        )}
        <div className="mt-2 lg:mt-5 mx-1 lg:mx-3">
          <div className="flex items-end">
            <h1 className="text-xl lg:text-3xl font-semibold">
              {userData.name}
            </h1>
            {isVenueManager && (
              <h2 className="text-md lg:text-xl font-semibold ms-2 text-gray-700">
                • VENUE MANAGER
              </h2>
            )}
          </div>
          <p className="font-semibold text-sm lg:text-lg">{userData.email}</p>

          <div>
            <p className="my-3 text-sm lg:text-lg">{userData.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col gap-2 justify-center items-center">
        <button
          className="font-semibold text-sm self-center hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 px-3 py-2 rounded flex items-center gap-2"
          onClick={toggleOverlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>{" "}
          Edit Profile
        </button>
        <button
          className="font-semibold text-sm self-center hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 px-3 py-2 rounded flex items-center gap-2"
          onClick={toggleOverlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>{" "}
          Register Venue
        </button>
      </div>
      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <EditProfile onClose={onClose} />
          </div>
        </div>
      )}
    </div>
  );
}
