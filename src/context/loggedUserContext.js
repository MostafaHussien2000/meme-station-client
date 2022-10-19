import { createContext, useState } from "react";

const LoggedUserContext = createContext();

export function UserProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
}

export default LoggedUserContext;
