import { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from "../../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic= useAxiosPublic();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logout = (email, password) => {
        setLoading(true);
        return signOut(auth);
    };
    const googleAuth = (email, password) => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const resetPassword = (email, password) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email, password)
    }

    const updateUserProfile = ({ name, photo }) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    };
    useEffect(() => {
        const onSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log("user found", currentUser);
            if(currentUser){
                const userInfo = {email : currentUser.email}
                axiosPublic.post("/jwt" , userInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.token){
                        localStorage.setItem("jwt-token" , res.data.token)
                    }
                    else{
                        localStorage.removeItem("jwt-token")
                    }
                    setLoading(false)
                })
            }
       
        })
        return () => onSubscribe();
    }, [])
    const authInfo = {
        user,setUser, loading, createUser, login, logout, googleAuth, updateUserProfile, resetPassword

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;