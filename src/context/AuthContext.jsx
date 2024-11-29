import { createContext, useContext, useState, useEffect } from "react";
import { updateUserProfileAPI } from "../hooks/updateUserProfile";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persist the user data in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Handle user login
  const login = (userData) => {
    console.log("Login response data:", userData);

    // Preserve venueManager if not provided in the backend response
    const updatedUserData = {
      ...userData.data,
    };

    console.log(
      "Logging in. VenueManager value:",
      updatedUserData.venueManager,
    );

    // Save to localStorage and update state
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Clean up localStorage
    localStorage.removeItem("accessToken"); // Clean up any other relevant data
  };

  // Update user profile and synchronize the state with the backend response
  const updateUserProfile = async (newUserData) => {
    try {
      if (!user || !user.accessToken) {
        console.error("User is not logged in or token is missing");
        return;
      }

      const updatedUserData = await updateUserProfileAPI(
        newUserData,
        user.accessToken,
        user.name,
      );

      // Merge the new data with existing user state
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUserData, // Merge updated fields
        avatar: updatedUserData.avatar || prevUser.avatar, // Update avatar if provided
        bio: updatedUserData.bio || prevUser.bio, // Update bio if provided
        venueManager: updatedUserData.venueManager ?? prevUser.venueManager, // Update venueManager if provided
      }));

      // Update localStorage to persist the changes
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...updatedUserData,
        }),
      );
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  // Helper values for context consumers
  const isLoggedIn = !!user; // Check if a user is logged in
  const accessToken = user?.accessToken; // Retrieve the accessToken
  const isVenueManager = user?.venueManager || false; // Determine venueManager status

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoggedIn,
        isVenueManager,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
