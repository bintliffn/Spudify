import { StyleSheet, Platform, Dimensions } from "react-native";
import { authorize } from "react-native-app-auth";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  topView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 40,
  },
  profilepic: {
    width: 100,
    height: 100,
  },
  usernameText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 20,
  },
  profileText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  followTopView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  followBottomView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 70,
    width: windowWidth * 0.9,
    padding: 20,
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
    paddingLeft: 20,
  },
});
