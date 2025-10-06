import { onAuthStateChanged } from "firebase/auth/cordova";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setuser] = useState(undefined);

    useEffect(() => {
        const Sub = onAuthStateChanged(auth, (data) => {
            setuser(data)
        })
        return () => Sub();
    }, []);

    const handleLogin = async (email, password) => {
        return await signInWithEmailAndPassword(auth , email, password);
    }

    const value = {
       user, handleLogin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider