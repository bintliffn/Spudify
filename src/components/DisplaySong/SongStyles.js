import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  safeView: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 70,
    width: windowWidth * 0.9,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  songText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontWeight: "bold",
    fontSize: 16,
  },
  artistText: {
    color: "#B3B3B3",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  innerView: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    paddingLeft: 20,
  },
  DurationView: {
    alignItems: "flex-end",
    //justifyContent: "center",
  },
});
