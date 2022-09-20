import { collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { StyleSheet, Text, View } from "react-native";

import React, { useEffect, useState } from "react";
import { useRetrieveUsers } from "../utils/customHooks";
import { useUserProvider } from "./contexts/UserProvider";

// FOR TESTING PURPOSES

const User = () => {
  // calling the useRetrieveUsers to get a list of users back
  const users = useRetrieveUsers();
  console.log(users);

  // referencing the global state from the useUserProvider
  const { user, setUser } = useUserProvider();
  // setting the first element from the users list to be the selected user
  setUser(users[0]);

  console.log("i am the current user", user);
  return (
    <View style={styles.container}>
      {users.map((user, index) => (
        <Text key={index}>{user.age}</Text>
      ))}
      <Text>Hi</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
