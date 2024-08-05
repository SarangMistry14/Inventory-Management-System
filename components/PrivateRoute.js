"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect, useLayoutEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    console.log(currentUser);
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>; // or a spinner
  }

  return children;
};

export default PrivateRoute;
