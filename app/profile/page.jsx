"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  Box,
  TextField,
  Typography,
  Button,
  Link,
  Container,
} from "@mui/material";
import PrivateRoute from "../../components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";

//
export default function Profile() {
  // getting current user
  const { currentUser } = useAuth();
  //* state for initial values
  const [initialValues, setInitialValues] = useState("");
  //* states for first last and email
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  //* state for button
  const [isChanged, setIsChanged] = useState(false);
  // ! add  api here
  useEffect(() => {
    if (currentUser) {
      const name = currentUser.displayName || null;
      console.log(name);
      setInitialValues(name);
      setFirstName(name);
      setEmail(currentUser.email);
    } else {
      console.log("user Does not exist");
    }
  }, []);
  // use effect
  useEffect(() => {
    if (firstName !== initialValues) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [firstName]);

  const handleSaveChanges = async () => {
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName: firstName });
        console.log("Display name updated successfully");
        setIsChanged(false);
      } catch (error) {
        console.error("Error updating display name: ", error);
      }
    } else {
      console.error("No user is signed in");
    }
  };

  return (
    <PrivateRoute>
      <Navbar />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"95vh"}
        // !fix this
        sx={{
          background: "rgb(2,0,36)",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(53,135,251,1) 86%)",
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          // width={"50%"}
          // height={"50%"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          // margin="auto"
          // marginTop={5}
          padding={5}
          borderRadius={5}
          // !fix this
          backgroundColor="rgba(255, 255, 255)"
          boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.1)"}
          gap={2}
          sx={{
            // !fix this
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3">Profile</Typography>
          {/* First Name */}
          <TextField
            id="outlined-helperText"
            label="First Name"
            type="text"
            // defaultValue="Default Value"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          {/* Last Name */}
          {/* <TextField
            type="text"
            id="outlined-helperText"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          /> */}
          {/* Email */}
          <TextField
            disabled
            type="email"
            id="outlined-disabled"
            label="Email"
            value={email}
          />
          {/* Save Changes Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            disabled={!isChanged}
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
