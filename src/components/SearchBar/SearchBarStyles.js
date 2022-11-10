import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 20,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    //flexDirection: "row",
    height: 70,
    width: windowWidth * 0.9,
    padding: 15,
  },
  masterView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
  },
  buffer: {
    width: "100%",
    height: 10,
  },
  bodyText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 20,
    paddingBottom: 10,
  },
  rowView : {
    flexDirection: "row",
    zIndex : 1
  },
  selectDropdown: {
    width: windowWidth * 0.3,
    backgroundColor: "#434343",
    borderWidth: 0,
    borderRadius : 25,
  },
  dropdownContainer: {
    width: windowWidth * 0.3,
    backgroundColor: "#434343",
    borderWidth: 0,
    borderRadius: 25,
  },
  dropdownText: {
    color: "#1DB954",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 12,
    fontWeight: "bold",
    width: windowWidth * 0.3,
  },
  searchBar: {
    width: windowWidth * 0.675,
    backgroundColor: "#434343",
    borderWidth: 0,
    borderRadius: 25,
    marginLeft: windowWidth * 0.7,
    marginRight : windowWidth *.0125
  },
});
