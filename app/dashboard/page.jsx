"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import PrivateRoute from "../../components/PrivateRoute";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

// function
export default function Dashboard() {
  //getting current user
  const { currentUser } = useAuth();
  //  state for inventory
  const [inventory, setInventory] = useState({});
  // state to add item
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    // updateInventory();
    const fetchData = async () => {
      if (currentUser) {
        console.log("the user id is " + currentUser.uid);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          console.log("got data");
          console.log(typeof userDoc.data().inventory);
          console.log(userDoc.data().inventory);
          // ! call the  setInventory
          setInventory(userDoc.data().inventory);
        } else {
          console.log("Data does not exits");
        }
      } else {
        console.log("user does not exits");
      }
    };
    // calling the funciton
    fetchData();
  }, []);

  // *Functions
  const addItemFunction = async () => {
    const userId = currentUser.uid;
    const userDocRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userInventory = userData.inventory || {};

        // Update the inventory object
        if (userInventory[itemName]) {
          // Item already exists, increment the quantity
          userInventory[itemName] += 1;
        } else {
          // Item does not exist, add it with a quantity of 1
          userInventory[itemName] = 1;
        }

        // Update the Firestore document
        await updateDoc(userDocRef, { inventory: userInventory });
      } else {
        // If user document does not exist, create it with the new item
        await setDoc(userDocRef, { inventory: { [itemName]: 1 } });
      }

      // Update local state
      setInventory((prevInventory) => ({
        ...prevInventory,
        [itemName]: (prevInventory[itemName] || 0) + 1,
      }));
    } catch (error) {
      console.error("Error adding item: ", error);
    }

    setItemName("");
  };

  //* incrementing the quantity
  const incrementQuantity = async (name) => {
    const userId = currentUser.uid;
    const userDocRef = doc(db, "users", userId);

    try {
      // Fetch document
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const userInventory = userData.inventory || {};

      if (userInventory[name]) {
        // Item exists
        userInventory[name] += 1;
        await updateDoc(userDocRef, { inventory: userInventory });

        // Update local
        setInventory((prevInventory) => ({
          ...prevInventory,
          [name]: (prevInventory[name] || 0) + 1,
        }));
      } else {
        console.error("Cannot increment quantity. Item does not exist:", name);
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  //! Decrement
  const decrementQuantity = async (name) => {
    const userId = currentUser.uid;
    const userDocRef = doc(db, "users", userId);

    try {
      // Fetch
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const userInventory = userData.inventory || {};

      if (userInventory[name]) {
        if (userInventory[name] > 1) {
          //* Item exists more than 1
          userInventory[name] -= 1;
          await updateDoc(userDocRef, { inventory: userInventory });

          // Update local
          setInventory((prevInventory) => ({
            ...prevInventory,
            [name]: prevInventory[name] - 1,
          }));
        } else {
          //* quantity is 1
          delete userInventory[name];
          await updateDoc(userDocRef, { inventory: userInventory });

          // Update local
          setInventory((prevInventory) => {
            const updatedInventory = { ...prevInventory };
            delete updatedInventory[name];
            return updatedInventory;
          });
        }
      } else {
        console.error("Cannot decrement quantity. Item does not exist:", name);
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  return (
    <PrivateRoute>
      <Navbar />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"95vh"}
        sx={{
          background: "rgb(2,0,36)",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(53,135,251,1) 86%)",
        }}
      >
        <Box
          border={"solid"}
          padding={3}
          borderRadius={3}
          backgroundColor={'white'}
         
        >
          <Typography variant="h3">Inventory Item</Typography>
          {/* box for item add */}

          <Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              paddingTop={2}
              gap={1}
            >
              <TextField
                id="outlined-helperText"
                label="Add Item"
                type="text"
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
                sx={{
                  flex: "1",
                }}
              />
              <Button
                variant="contained"
                onClick={addItemFunction}
                sx={{
                  height: "100%",
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
          {/* items */}
          <Box marginTop={2}>
            <Stack
              width={"auto"}
              minWidth="500px"
              maxWidth={"800px"}
              spacing={2}
              maxHeight="500px"
              height="auto"
              overflow={"auto"}
            >
              {Object.keys(inventory).length === 0 ? (
                <Box
                  width="100%"
                  minHeight="100px"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bgcolor={"#f0f0f0"}
                  paddingX={3}
                  borderRadius={2}
                >
                  <Typography
                    variant={"h6"}
                    color={"#333"}
                    textAlign={"center"}
                  >
                    Add item to the inventory
                  </Typography>
                </Box>
              ) : (
                Object.entries(inventory).map(([name, quantity]) => (
                  <Box
                    key={name}
                    width="100%"
                    minHeight="100px"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    bgcolor={"#f0f0f0"}
                    paddingX={3}
                    borderRadius={2}
                  >
                    <Typography
                      variant={"h6"}
                      color={"#333"}
                      textAlign={"center"}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant={"h6"}
                      color={"#333"}
                      textAlign={"center"}
                    >
                      Quantity: {quantity}
                    </Typography>
                    <Box display={"flex"} gap={2}>
                      <Button
                        variant="contained"
                        onClick={() => decrementQuantity(name)}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          minWidth: 0,
                          padding: 0,
                          background: "red",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          ":hover": {
                            color: "red",
                            background: "white",
                            border: "1px solid red",
                          },
                        }}
                      >
                        <Typography variant="h6">-</Typography>
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => incrementQuantity(name)}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          minWidth: 0,
                          padding: 0,
                          background: "green",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          ":hover": {
                            color: "green",
                            background: "white",
                            border: "1px solid green",
                          },
                        }}
                      >
                        <Typography variant="h6">+</Typography>
                      </Button>
                    </Box>
                  </Box>
                ))
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
