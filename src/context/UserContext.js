import React, {useState} from "react";

const Context = React.createContext({})

export function UserContextProvider ({children}) {
    const [session, setSession] = useState(
        () => JSON.parse(window.sessionStorage.getItem('session'))
    )

    return <Context.Provider value={{session, setSession}}>
        {children}
    </Context.Provider>

}

export default Context