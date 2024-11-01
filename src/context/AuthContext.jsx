import { createContext, useContext, useState, useEffect } from "react";

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

  const updateAvatar = (newAvatar) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatar,
    }));
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
    <AuthContext.Provider value={{ user, isLoggedIn, isVenueManager, login, logout, updateAvatar, updateBookings }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
