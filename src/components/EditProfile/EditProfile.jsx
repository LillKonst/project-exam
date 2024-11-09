import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile() {
  const { user, updateUserProfile } = useAuth();

  const [newUserData, setNewUserData] = useState({
    avatarUrl: user?.avatar?.url || "",
    bio: user?.data?.bio || "",
    venueManager: user?.venueManager || false, 
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data before submitting:", newUserData);
    updateUserProfile(newUserData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">EDIT PROFILE</h2>
        <div className="flex justify-center items-center aspect-2/4 bg-blue-400">
          <img className="rounded-full"/>
        </div>
        <label htmlFor="avaturUrl" className="text-sm font-medium">Profile image URL:</label>
        <input
        type="url"
        name="avatarUrl"
        id="avatarUrl"
        value={newUserData.avatarUrl}
        onChange={handleChange}
        placeholder="Enter image URL"
        className="border rounded-lg p-2 w-full"/>
        <label htmlFor="bio" className="text-sm font-meduim">Bio:</label>
        <textarea
        name ="bio"
        id="bio"
        value={newUserData.bio}
        onChange={handleChange}
        placeholder="Enter bio."
        className="border rounded-lg p-2 w-full"
        rows="3"/>
        <div>
          <input
          type="checkbox"
          name="venueManager"
          id="venueManager"
          checked={newUserData.venueManager}
          onChange={handleChange}
          className="mr-2"
          />
          <label htmlFor="venueManager" className="text-sm font-medium">
            Become a Venue Manager
          </label>
        </div>
        <button
        type="submit"
        className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg">
          UPDATE
        </button>
      </form>
    </div>
  );
}