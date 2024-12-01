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
  const [warning, setWarning] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const initialFormData = {
        avatarUrl: user?.avatar?.url || "",
        bio: user?.bio || "",
        venueManager: user?.venueManager || false,
      };
      setNewUserData(initialFormData);
      setInitialData(initialFormData);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submitting:", newUserData);

    if (!newUserData.avatarUrl.trim()) {
      setError("Profile image URL is required.");
      return;
    }

    const updatedFields = {};

    // Collect the fields that have changed
    Object.keys(newUserData).forEach((key) => {
      if (newUserData[key] !== initialData[key]) {
        updatedFields[key] = newUserData[key];
      }
    });

    console.log("Updated fields being sent:", updatedFields);

    if (Object.keys(updatedFields).length > 0) {
      try {
        setLoading(true);
        setError(null);

        await updateUserProfile(updatedFields);
        console.log("Profile updated successfully!");
        onClose();
      } catch (err) {
        if (err.message === "Token expired. Please log in again.") {
          await handleTokenRefresh();
        } else {
          setError("Failed to update profile. Please try again.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError("No changes to update.");
      console.log("No changes to update.");
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const refreshedUserData = await refreshToken();
      setUser(refreshedUserData);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };

      // Show warning when venueManager is unchecked
      if (name === "venueManager" && !checked) {
        setWarning(
          "Warning: You will lose your Venue Manager status and your venues will be deactivated.",
        );
      } else {
        setWarning(""); // Clear warning when checked
      }

      return updatedData;
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClose}
        className="absolute text-2xl top-0 right-5 m-2 p-2 text-gray-700 rounded-lg font-semibold focus:outline-none"
      >
        ✕
      </button>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">EDIT PROFILE</h2>
        <div className="flex justify-center items-center aspect-2/4 bg-blue-400">
          <img className="rounded-full" />
        </div>
        <label htmlFor="avatarUrl" className="text-sm font-medium">
          Profile image URL:
        </label>
        <input
          type="url"
          name="avatarUrl"
          id="avatarUrl"
          value={newUserData.avatarUrl}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="border rounded-lg p-2 w-full"
        />
        <label htmlFor="bio" className="text-sm font-medium">
          Bio:
        </label>
        <textarea
          name="bio"
          id="bio"
          value={newUserData.bio}
          onChange={handleChange}
          placeholder="Enter bio."
          className="border rounded-lg p-2 w-full"
          rows="3"
        />
        <div className="m-2">
          <p>Would you like to register and manage your own venues?</p>
          <input
            type="checkbox"
            name="venueManager"
            id="venueManager"
            checked={newUserData.venueManager}
            onChange={handleChange}
            className=" m-2 h-4 w-4 text-customWhite rounded focus:ring-none focus:outline-none transition duration-200 ease-in-out"
          />
          <label htmlFor="venueManager" className="text-sm font-medium">
            Become a Venue Manager
          </label>
        </div>
        {warning && <div className="text-red-500 m-2 p-2">{warning}</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <button
          type="submit"
          className="bg-customRed text-black font-semibold py-2 px-4 rounded-lg"
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
}
