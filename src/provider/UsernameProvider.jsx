import { useState } from "react";
import { UsernameContext } from "../context";

function UsernameProvider({ children }) {
  const [username, setUsername] = useState("");
  console.log("Username in SignUpPage:", username);
  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export default UsernameProvider;
