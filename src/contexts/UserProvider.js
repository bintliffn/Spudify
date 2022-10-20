import React, { useContext, useState, useMemo } from "react";

const UserContext = React.createContext({ user: {}, setUser: () => {} });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const userValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

// consuming the userContext
const useUserProvider = () => useContext(UserContext);

//exporting a custom user hook
export { UserProvider, useUserProvider };
