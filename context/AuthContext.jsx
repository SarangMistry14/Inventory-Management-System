"use client";
import React, { useEffect } from "react";
import { useState, useContext, useRef } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// firestore function
import { doc, getDoc } from "firebase/firestore";

// work as a wraper
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // storing current user
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //   Login with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //* all the value that we want to provide for the app
  const value = {
    currentUser,
    login,
    signup,
    logout,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
