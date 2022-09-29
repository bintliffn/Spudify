import { StyleSheet, Platform, Dimensions } from "react-native";
import { authorize } from "react-native-app-auth";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 70,
    width: windowWidth * 0.9,
    padding: 10,
  },
  usernameText: {
    color: "white",
    fontSize: 25,
    padding: 30,
  },
  profileText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  profilepic: {
    width: 100,
    height: 100,
    bottom: 20,
  },
  profileView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  topView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },

  safeView: {
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingVertical: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
  playlistText: {
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontWeight: "bold",
    fontSize: 20,
  },
});
