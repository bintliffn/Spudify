import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  createUser,
  deleteUser,
  readUser,
  readUsers,
} from "@src/utils/api/FirebaseCrud";
import { useRetrieveUsers } from "@src/utils/customHooks";
import { useUserProvider } from "@src/components/contexts/UserProvider";

const UserScreen = () => {
  const { user, setUser } = useUserProvider();

  let userObject = {
    id: "hello",
    name: "New User",
    age: 22,
  };

  //   const users = useRetrieveUsers();

  //   //   createUser(userObject);
  //   if (users != null) {
  //     console.log(users);

  //     const first_user = users[0];

  //     console.log(first_user);
  //     // console.log("deleted", first_user?.id);
  //     // deleteUser(first_user?.id);
  //   }

  //   createUser(userObject);

  //   useEffect(() => {
  //     const data = readUsers();
  //     data.then(() => setUser(data));
  //   }, [readUsers]);

  //   console.log(user);

  readUser("PrettyLegit");

  return (
    <View style={styles.root}>
      <Text style={styles.text}>UserScreen</Text>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  root: {
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
