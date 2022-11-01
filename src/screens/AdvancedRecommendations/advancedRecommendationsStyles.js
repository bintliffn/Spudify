import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  masterView: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  sliderView: {
    alignItems: "stretch",
    width: windowWidth * 0.9,
  },
  textInput: {
    width: windowWidth * 0.9,
    padding: 0,
  },
  bodyText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 20,
    paddingBottom: 10,
  },
});
