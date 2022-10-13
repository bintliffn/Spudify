import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 211,
    height: 80,
    justifyContent: "center",
    backgroundColor: "#1DB954",
  },
  loginButtonText: {
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 30,
  },
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    color: "white",
    fontSize: 50,
    paddingTop: 100,
    paddingBottom: 300,
  },
  bodyText: {
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    color: "white",
    fontSize: 15,
    paddingBottom: 10,
  },
  logo: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 5,
    left: 25,
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    color : "#B3B3B3"
  },
});
