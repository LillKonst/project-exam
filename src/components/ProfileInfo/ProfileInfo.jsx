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
    <div className="flex flex-col sm:flex-row w-full lg:w-3/4 relative md:p-3 md:m-3">
      <div className="flex sm:gap-2">
        {userData.avatar && userData.avatar.url && (
          <img
            src={userData.avatar.url}
            alt={userData.avatar.alt || "User Avatar"}
            className="w-14 h-14 xs:w-24 xs:h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-4 m-1 sm:m-2 lg:m-4"
          />
        )}
        <div className="mt-2 lg:mt-5 mx-1 lg:mx-3">
          <div className="flex items-center sm:items-end flex-wrap">
            <h1 className="text-md xxs:text-xl xs:text-2xl lg:text-3xl font-semibold">
              {userData.name}
            </h1>
            {isVenueManager && (
              <h2 className="text-sm xxs:text-lg lg:text-xl font-semibold ms-2 text-gray-700">
                • VENUE MANAGER
              </h2>
            )}
          </div>
          <p className="font-semibold text-xs xxs:text-sm xs:text-md lg:text-lg">
            {userData.email}
          </p>

          <div>
            <p className="my-3 text-sm xxs:text-md text-wrap xs:text-lg">
              {userData.bio}
            </p>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 xxs:gap-4 sm:gap-2 justify-start sm:mt-3 lg:mt-5 xxs:ms-2 sm:ms-6">
        <button
          className="font-semibold sm:w-full text-sm self-center hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 p-1 xxs:px-3 xs:py-2 rounded flex items-center gap-2 shadow-md"
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
          className="font-semibold text-sm sm:w-full self-center hover:bg-hoverRed text-customWhite bg-customRed lg:ms-12 p-1 xxs:px-3 xs:py-2 rounded flex items-center gap-2 shadow-md"
          onClick={toggleOverlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
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
