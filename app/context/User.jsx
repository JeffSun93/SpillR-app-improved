import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({
    user_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    name: "Marcus Johnson",
    username: "bingewatcher",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    language: "English",
  });
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
