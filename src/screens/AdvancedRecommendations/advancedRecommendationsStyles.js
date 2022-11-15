import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  masterView: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBarView : {
    alignItems : "center",
    justifyContent: "center",
    height : 400 
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
  buttonText: {
    color: "#1DB954",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 12,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
  button: {
    width: windowWidth * 0.5,
    height: 50,
    backgroundColor: "#434343",
    color: "#B3B3B3",
    justifyContent: "center",
    borderRadius: 40,
    margin: 5
  },
});
