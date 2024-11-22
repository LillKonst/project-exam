import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile({ onClose }) {
  const { user, updateUserProfile } = useAuth();
  const [newUserData, setNewUserData] = useState({
    avatarUrl: "",
    bio: "",
    venueManager: false, 
  });
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const initialFormData = {
        avatarUrl: user?.avatar?.url || "",
        bio: user?.data?.bio || "",
        venueManager: user?.venueManager || false, 
      };
      setNewUserData(initialFormData);
      setInitialData(initialFormData);
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submitting:", newUserData);

    const updatedFields = Object.keys(newUserData).reduce((changes, key) => {
      if (newUserData[key] !== initialData[key]) {
        changes[key] = newUserData[key];
      }
      return changes;
    }, {});

    if (newUserData.venueManager !== initialData.venueManager) {
      updatedFields.venueManager = newUserData.venueManager;
    }

  if (Object.keys(updatedFields).length > 0) {
    try {
      setLoading(true); // Set loading to true when request starts
      setError(null); // Reset error before making the request

      await updateUserProfile(updatedFields); // Wait for the update to finish
      onClose(); // Close the modal upon successful update

    } catch (err) {
      if (err.message === "Token expired. Please log in again.") {
        // Token was expired, handle token refresh
        await handleTokenRefresh();
      } else {
        setError("Failed to update profile. Please try again."); // Show error message
        console.error(err);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  } else {
    setError("No changes to update."); // Set error when no changes are detected
    console.log("No changes to update.");
  }
};

const handleTokenRefresh = async () => {
  try {
    // Assuming there's a function to refresh the token and get the new user data
    const refreshedUserData = await refreshToken();
    setUser(refreshedUserData);
  } catch (error) {
    console.error("Failed to refresh token:", error);
    logout(); // Clear user data if token refresh fails
  }
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
      <button
        className="close-button bg-red-500 text-white p-2 rounded-md mb-4"
        onClick={onClose}
      >
        Close
      </button>
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
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <button
        type="submit"
        className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg">
          UPDATE
        </button>
        
      </form>
    </div>
  );
}