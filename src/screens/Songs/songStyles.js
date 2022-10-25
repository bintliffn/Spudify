import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    flex: 1,
    width: windowWidth * 0.95,
  },
  parentView :{
    height : windowHeight
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: windowHeight * 0.025,
    width: windowWidth,
    zIndex: 1
  },
  songOrArtistView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
    width: windowWidth * 0.95,
    borderRadius: 10,
  },
  dataView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  titleText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 25,
    paddingLeft: windowWidth * 0.05,
    paddingRight: 25,
  },
  selectDropdown: {
    width: windowWidth * 0.4,
    backgroundColor: "#434343",
    borderWidth: 0,
    borderRadius: 25,
  },
  dropdownContainer: {
    backgroundColor: "#434343",
    maxWidth: windowWidth * 0.4,
    borderWidth: 0,
    borderRadius: 25,
  },
  dropdownText: {
    color: "#1DB954",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 12,
  },
});
