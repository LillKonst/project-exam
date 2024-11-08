import { useAuth } from "../../context/AuthContext"
import { useState } from "react";
import EditProfile from "../EditProfile/EditProfile";

export default function ProfileInfo() {
  const { user, isVenueManager } = useAuth();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  if (!user) {
    return <div>No user information available.</div>
  }

  const userData = user.data; 

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

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
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
          {isVenueManager && (
            <h2 className="text-2xl font-semibold">Venue Manager</h2>
          )}
        </div>
        <p className="font-semibold">
          {userData.email}
        </p>

        <div>
          <p className="my-3"> The bio should be displayed here.{userData.bio}</p>
        </div>
      </div>
      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <button 
              className="close-button" 
              onClick={toggleOverlay}
            >
              Close
            </button>
            <EditProfile />
          </div>
        </div>
      )}
    </div>
  );
}