import { createContext, useState } from "react";

export const StoreContext = createContext(null);
const StoreContextComp = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
  });

  return (
    <StoreContext.Provider value={{ userDetails, setUserDetails }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextComp;
