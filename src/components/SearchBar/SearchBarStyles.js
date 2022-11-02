import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 70,
    width: windowWidth * .9,
    padding: 15,
  },
  masterView : {
    height : 250,
   // alignItems : "flex-start",
   // justifyContent : "flex-start"
  },
  addplaylistButton: {
    borderRadius: 40,
    width: windowWidth * 0.5,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "#1DB954",
    borderWidth: 1,
  },
  buttonText: {
    color: "#1DB954",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 15,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
  buffer: {
    width : "100%",
    height : 10

  }
});
