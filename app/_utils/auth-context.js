"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const createAccount = async (email, password, username) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Set displayName for the newly created user
        await updateProfile(result.user, {
            displayName: username
        });

        return result.user;
    };


    // --- Email Sign-in Function ---
    const emailSignIn = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // --- GitHub Sign-in ---
    const gitHubSignIn = async () => {
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider);
    };

    // --- Sign-out ---
    const firebaseSignOut = async () => {
        await signOut(auth);
        redirect('/');
    };

    return (
        <AuthContext.Provider value={{ user, emailSignIn, createAccount, gitHubSignIn, firebaseSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(AuthContext);
}
