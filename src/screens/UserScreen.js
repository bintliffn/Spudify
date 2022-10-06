import { useUserProvider } from "@src/components/contexts/UserProvider";
import { useReadAllUsers, useReadUser } from "@src/utils/api/FirebaseCrud";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const UserScreen = () => {
  const { user, setUser } = useUserProvider();

  const { data, dataError } = useReadUser("PrettyLegit");
  // const { data, dataError } = useReadAllUsers();

  useEffect(() => {
    setUser(data);
    // console.log(data);
    console.log(user);
  }, [data]);

  return user ? (
    <View style={styles.root}>
      <Text style={styles.text}>{user?.name}</Text>
      <Text style={styles.text}>{user?.age}</Text>
      <Text style={styles.text}>{user?.top_music_genre_1}</Text>
      <Text style={styles.text}>{user?.top_music_genre_2}</Text>
      <Text style={styles.text}>{user?.top_music_genre_3}</Text>
    </View>
  ) : (
    <View style={styles.root}>
      <Text style={styles.text}>loading..</Text>
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
