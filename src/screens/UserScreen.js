import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  createUser,
  deleteUser,
  readUser,
  readUsers,
  useReadAllUsers,
  useReadUser,
} from "@src/utils/api/FirebaseCrud";
import { useUserProvider } from "@src/components/contexts/UserProvider";

const UserScreen = () => {
  const { user, setUser } = useUserProvider();

  const { data, dataError } = useReadUser("PrettyLegit");

  if (user) {
    setUser(data);
    console.log(user);
  }

  return user ? (
    <View style={styles.root}>
      <Text style={styles.text}>{user?.name}</Text>
      <Text style={styles.text}>{user?.age}</Text>
      <Text style={styles.text}>{user?.top_music_genre_1}</Text>
      <Text style={styles.text}>{user?.top_music_genre_2}</Text>
      <Text style={styles.text}>{user?.top_music_genre_3}</Text>
    </View>
  ) : (
    <Text>loading..</Text>
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
