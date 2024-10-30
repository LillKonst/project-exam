import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null); 
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] =useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; 
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Store user data when it changes
    } else {
      localStorage.removeItem('user'); // Remove user data from local storage if null
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    // setIsLoggedIn(true);
    // localStorage.setItem('user', JSON.stringify(userData))
  };

  const logout = () => {
    setUser(null);
    // setIsLoggedIn(false);
    // localStorage.removeItem('user');
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
