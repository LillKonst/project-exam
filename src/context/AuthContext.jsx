import { createContext, useContext, useState, useEffect } from "react";
import { updateUserProfileAPI } from "../hooks/updateUserProfile";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; 
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); 
    } else {
      localStorage.removeItem('user'); 
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = async (newUserData) => {
    try {
      if (!user || !user.data.accessToken) {
        console.error("User is not logged in or token is missing");
        return;
      }
  
      // Pass the user's auth token to the API function
      const updatedUserData = await updateUserProfileAPI(newUserData, user.data.accessToken, user.data.name);
  
      // Update context state, only overriding the changed properties
      setUser((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser.data,          // Spread existing data
          ...updatedUserData,         // Update with new data fields from API response
          accessToken: prevUser.data.accessToken, // Keep the accessToken intact
        },
        avatar: updatedUserData.avatar || prevUser.avatar,  // Update if returned, else keep existing
        venueManager: updatedUserData.venueManager ?? prevUser.data.venueManager, // Update if defined, else keep existing
      }));
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };
  

   const updateBookings = (newBookings) => {
    setUser((prevUser) => ({
      ...prevUser,
      bookings: newBookings,
    }));
  };

  const isLoggedIn = !!user;

  const isVenueManager = user?.venueManager || false;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isVenueManager, login, logout, updateUserProfile, updateBookings }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
