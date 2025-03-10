import { useEffect, useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const loginUser = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    if (!user) {
      return;
    }
    setUser(null);
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    if (user?.access_token) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    if (!user) {
      if (sessionStorage.getItem("user")) {
        setUser(JSON.parse(sessionStorage.getItem("user")));
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};