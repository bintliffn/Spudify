import { useUserProvider } from "@src/components/contexts/UserProvider";
import { useRetrieveUsers } from "@src/utils/customHooks";
import { StyleSheet, Text, View } from "react-native";

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
