"use client";
import React, { useState } from "react";
import { Box, TextField, Typography, Button, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Login() {
  //
  const router = useRouter();
  // Use state for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //
  const [loading, setLoading] = useState(false);
  const { login, userInfo } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    if (!email || !password) {
      setError("Please enter your Email and Password");
    }
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      console.log("Successfully logged in");
      router.push("/dashboard");
    } catch {
      setLoading(false);
      return setError("Invalid Login Credential");
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // ! fix the image
          // backgroundImage: "url(/image/background-img.png)",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",

          background: "rgb(2,0,36)",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(53,135,251,1) 86%)",
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={5}
          padding={5}
          borderRadius={5}
          //! change the following
          backgroundColor="rgba(255, 255, 255)"
          boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.1)"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3" padding={3} textAlign={"center"}>
            Login
          </Typography>
          <Typography
            sx={{
              color: "red",
              display: !error ? "none" : "inline-block",
            }}
          >
            {error}
          </Typography>
          {/* <TextField type="text" variant="outlined" placeholder="Name" /> */}
          <TextField
            type="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
            Login
          </Button>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            paddingTop={1}
          >
            {/* To Sign up */}
            <Typography>Don't Have an account?</Typography>
            <Link
              href="/signup"
              sx={{
                ":hover": {
                  color: "red",
                },
              }}
            >
              Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
