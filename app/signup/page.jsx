"use client";

import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Link } from "@mui/material";
import{useAuth} from '../../context/AuthContext'
import { useRouter } from "next/navigation";
//
export default function SignUp() {
  
  // router 
  const router = useRouter();

  // Use state for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {signup, currentUser} = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    if (!email || !password || !confirmPassword) {
      return setError("Please enter your Email and Password");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password)
      router.push("../dashboard");

    } catch(err) {
      // console.error(err)
      setLoading(false);
      return setError("Failed to Create an account");
    }
    setLoading(false);
    // console.log("end handel submit")
  };

  // If the user is already sign in
  useEffect(() => {
    // Check if the user is already signed in
    if (currentUser) {
      // Redirect to the dashboard if the user is authenticated
      router.push('../dashboard');
    }
  }, [currentUser, router]);

  return (
    <>
      <form onSubmit={handelSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3" padding={3} textAlign={"center"}>
            Sign Up
          </Typography>
          <Typography>
            {currentUser && currentUser.email}
          </Typography>
          <Typography
            sx={{
              color: "red",
              display: !error ? "none" : "inline-block",
              paddingBottom: 1,
            }}
          >
            {error}
          </Typography>
          {/* <TextField type="text" variant="outlined" placeholder="Name" /> */}
          {/* -------------------------------------------------------------------------------------------------------- */}
          {/* Email box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="p">Email</Typography>
            <TextField
              type="email"
              variant="outlined"
              placeholder="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          {/* ---------------------------------------------------------------------------------------------------------------- */}
          {/* password box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="p">Password</Typography>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          {/* confirm password box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="p">Confirm Password</Typography>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Confirm Password"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
          {/* --------------------------------------------------------------------------------------------------------- */}
          <Button
            variant="contained"
            //! Change the color
            sx={{
              marginTop: 3,
              borderRadius: 3,
            }}
            type="submit"
            disabled={loading}
          >
            Sign Up
          </Button>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            paddingTop={1}
          >
            {/* To Sign up */}
            <Typography>Already have an account?</Typography>
            <Link
              href="/signup"
              sx={{
                ":hover": {
                  color: "red",
                },
              }}
            >
              Login
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
}
