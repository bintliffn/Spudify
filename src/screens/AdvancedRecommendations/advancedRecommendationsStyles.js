import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  masterView: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  searchBarView : {
    width: windowWidth * 1,
    alignItems : "center",
    justifyContent: "center"
  },
  textInput: {
    width: "100%",
    padding: 0,
  },
  bodyText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 20,
    paddingBottom: 10,
  },
});
