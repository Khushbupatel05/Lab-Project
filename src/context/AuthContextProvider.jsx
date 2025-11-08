import { onAuthStateChanged } from "firebase/auth/cordova";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

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
        return await signInWithEmailAndPassword(auth, email, password);
    }
    const handleForgotPassword = async (email) => {
        try {
            if (!email) {
                toast.warning("Please enter your email first!");
                return;
            }
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset link sent! Check your email.");
        } catch (error) {
            console.error("Forgot Password Error:", error);
            toast.error("Unable to send reset email. Check the address.");
        }
    };

    const value = {
        user, handleLogin,  handleForgotPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider