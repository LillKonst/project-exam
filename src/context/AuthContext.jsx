// import { createContext, useContext, useState, useEffect } from "react";
// import { updateUserProfileAPI } from "../hooks/updateUserProfile";
// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null; 
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user)); 
//     } else {
//       localStorage.removeItem('user'); 
//     }
//   }, [user]);

//   const login = (userData) => {
//     const updatedUserData = {
//       ...userData,
//       venueManager: userData?.venueManager ?? false,  // Ensure it's set to false if undefined
//     };
  
//     // Store the user data (including venueManager) in localStorage
//     localStorage.setItem('user', JSON.stringify(updatedUserData));
  
//     // Set the user state in context
//     setUser(updatedUserData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const updateUserProfile = async (newUserData) => {
//     try {
//       if (!user || !user.data.accessToken) {
//         console.error("User is not logged in or token is missing");
//         return;
//       }
  
//       // Pass the user's auth token to the API function
//       const updatedUserData = await updateUserProfileAPI(newUserData, user.data.accessToken, user.data.name);
  
//       // Update context state, only overriding the changed properties
//       setUser((prevUser) => ({
//         ...prevUser,
//         data: {
//           ...prevUser.data,          // Spread existing data
//           ...updatedUserData,         // Update with new data fields from API response
//           accessToken: prevUser.data.accessToken, // Keep the accessToken intact
//         },
//         avatar: updatedUserData.avatar || prevUser.avatar,  // Update if returned, else keep existing
//         venueManager: updatedUserData.venueManager ?? prevUser.venueManager, // Update if defined, else keep existing
//       }));
//     } catch (error) {
//       console.error("Failed to update user profile:", error);
//     }
//   };
  


//   const isLoggedIn = !!user;
//   const accessToken = user?.data?.accessToken;

//   const isVenueManager = user?.venueManager || false;

//   return (
//     <AuthContext.Provider value={{ user, accessToken, isLoggedIn, isVenueManager, login, logout, updateUserProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

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

  console.log("Logging in. VenueManager value:", updatedUserData.venueManager);

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
      if (!user || !user.data?.accessToken) {
        console.error("User is not logged in or token is missing");
        return;
      }

      // Call the API to update the profile
      const updatedUserData = await updateUserProfileAPI(
        newUserData,
        user.data.accessToken,
        user.data.name
      );

      // Update the user context and localStorage with the new data
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          data: {
            ...prevUser.data,
            ...updatedUserData, // Merge updated fields from API response
            accessToken: prevUser.data.accessToken, // Preserve the accessToken
          },
          avatar: updatedUserData.avatar || prevUser.avatar, // Update avatar if provided
          venueManager:
            updatedUserData.venueManager ?? prevUser.venueManager, // Update venueManager if provided
        };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist updated user
        return updatedUser;
      });
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  // Helper values for context consumers
  const isLoggedIn = !!user; // Check if a user is logged in
  const accessToken = user?.data?.accessToken; // Retrieve the accessToken
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
