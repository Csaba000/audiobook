import { createContext, useContext, useState } from 'react';

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => {},
});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginContext.Provider>
  );
};
