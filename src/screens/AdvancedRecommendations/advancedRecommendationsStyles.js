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
  buttonText: {
    color: "#B3B3B3",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 12,
    fontWeight : "bold",
    textAlignVertical: "center",
    textAlign: "center"
  },
  button:{
    width : windowWidth*.35,
    height : 50,
    backgroundColor : "#212121",
    color : "#B3B3B3",
    justifyContent : "center",
    borderRadius : 40,
  },
});
