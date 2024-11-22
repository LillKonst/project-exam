import { useAuth } from "../../context/AuthContext"
import { useState } from "react";
import EditProfile from "../EditProfile/EditProfile";

export default function ProfileInfo() {
  const { user, isVenueManager } = useAuth();
  console.log(user, isVenueManager);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  if (!user) {
    return <div>No user information available.</div>
  }
  console.log(user.accessToken);
  
  const userData = user; 

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const onClose = () => {
    setIsOverlayVisible(false);
  }

  return (
    <div className="flex w-full relative  p-3 m-1 md:m-3">
      {userData.avatar && userData.avatar.url && (
        <img
        src={userData.avatar.url}
        alt={userData.avatar.alt || "User Avatar"}
        className="w-32 h-32 rounded-full mb-4 m-4"
        />
      )}
      <button className="absolute top-9 right-3 font-semibold hover:underline" onClick={toggleOverlay}>Edit Profile</button>
      <div className="mt-5 mx-3">
        <div className="flex items-end">
          <h1 className="text-3xl font-semibold">{userData.name}</h1>
          {isVenueManager && (
            <h2 className="text-xl font-semibold ms-2 text-gray-700">• VENUE MANAGER</h2>
          )}
        </div>
        <p className="font-semibold text-lg">
          {userData.email}
        </p>

        <div>
          <p className="my-3 text-lg">{userData.bio}</p>
        </div>
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