"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
// *
import { useAuth } from "@/context/AuthContext";

// ! add evnet lisners

function Navbar() {
  // router
  const router = useRouter();
  //
  const { currentUser, logout } = useAuth();
  // console.log(currentUser.email);
  async function handleLogOut() {
    try {
      await logout();
      console.log("successfully log out");
      router.push("/");
    } catch (error) {
      console.log("Error log out");
      console.error(error);
    }
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          // backgroundColor: "red",
          color: "white",
        }}
      >
        {/* add background color here and change the text color */}
        <Toolbar>
          {/* // <IconButton></IconButton> */}
          <Typography
            variant="h6"
            component={"div"}
            sx={{
              flexGrow: 1,
            }}
          >
            IMS
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Button color="inherit" onClick={() => router.push("../dashboard")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => router.push("../profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogOut}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
