import { MainContext } from "@/context"
import { useState } from "react"


function MainContextProvider({children}) {

    const [role, setRole] = useState('creator');

    const mainContextInfo = {
        role,
        setRole
    }
    
  return (
    <MainContext.Provider value={mainContextInfo}>{children}</MainContext.Provider>
  )
}

export default MainContextProvider