import { createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import app from "../../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Corrected state initialization
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    const googleAuth = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    const updateUserProfile = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            }).then(() => {
                setUser({ ...auth.currentUser }); // Ensures the UI updates
            });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log("User found:", currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo)
                    .then((res) => {
                        if (res.data.token) {
                            localStorage.setItem("jwt-token", res.data.token);
                        } else {
                            localStorage.removeItem("jwt-token");
                        }
                    })
                    .catch((error) => console.error("JWT Error:", error));
            }
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        login,
        logout,
        googleAuth,
        updateUserProfile,
        resetPassword,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
