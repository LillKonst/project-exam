import { useAuth } from "../../context/AuthContext"
import { useState } from "react";
import EditProfile from "../EditProfile/EditProfile";

export default function ProfileInfo() {
  const { user, isVenueManager } = useAuth();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  if (!user) {
    return <div>No user information available.</div>
  }
  console.log(user.data.accessToken);
  
  const userData = user.data; 

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const onClose = () => {
    setIsOverlayVisible(false);
  }

  return (
    <div className="flex w-full relative">
      {userData.avatar && userData.avatar.url && (
        <img
        src={userData.avatar.url}
        alt={userData.avatar.alt || "User Avatar"}
        className="w-24 h-24 rounded-full mb-4 m-4"
        />
      )}
      <button className="absolute top-0 right-0 hover:underline" onClick={toggleOverlay}>Edit Profile</button>
      <div>
        <div className="mt-4 flex items-center">
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
          {isVenueManager && (
            <h2 className="text-xl font-semibold ms-2 text-gray-700">• VENUE MANAGER</h2>
          )}
        </div>
        <p className="font-semibold">
          {userData.email}
        </p>

        <div>
          <p className="my-3">{userData.bio}</p>
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