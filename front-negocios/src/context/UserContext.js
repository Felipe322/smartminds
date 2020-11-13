import React, {useState,useEffect} from 'react'
import {auth} from '../firebase/firebase'


const UserContext = React.createContext({})

export function UserContextProvider({children}) {
    const [userAuth,setUserAuth] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(setUserAuth);
      },[])

    return <UserContext.Provider value={{userAuth,setUserAuth}}>
        {children}
    </UserContext.Provider>
}


export default UserContext
