"use client";
import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Login />
    </>
  );
}
