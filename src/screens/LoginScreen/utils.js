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
    fontSize: 30,
  },
  titleText: {
    color: "white",
    fontSize: 50,
    paddingBottom: 300,
  },
  bodyText: {
    color: "white",
    fontSize: 15,
    paddingBottom: 30,
  },
  logo: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 40,
    left: 25,
  },
  parentView: {
    flex: 1,
  },
  loginPageView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dashboardView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
  },
});
