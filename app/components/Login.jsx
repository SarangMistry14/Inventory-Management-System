"use client";
import React, { useState } from "react";
import { Box, TextField, Typography, Button, Link } from "@mui/material";
function Login() {
  // Use state for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handelSubmit = () => {
    //  e.preventDefault;
    if (!email || !password) {
      setError("Please enter your Email and Password");
    }
  };

  return (
    <>
      <form>
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
            onClick={handelSubmit}
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
      </form>
    </>
  );
}

export default Login;