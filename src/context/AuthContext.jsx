import { createContext, useContext, useState, useEffect } from "react";
import { updateUserProfileAPI } from "../hooks/updateUserProfile";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    console.log("Login response data:", userData);

    const updatedUserData = {
      ...userData.data,
    };

    console.log(
      "Logging in. VenueManager value:",
      updatedUserData.venueManager,
    );

    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

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

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUserData,
        avatar: updatedUserData.avatar || prevUser.avatar,
        bio: updatedUserData.bio || prevUser.bio,
        venueManager: updatedUserData.venueManager ?? prevUser.venueManager,
      }));

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

  const isLoggedIn = !!user;
  const accessToken = user?.accessToken;
  const isVenueManager = user?.venueManager || false;

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
