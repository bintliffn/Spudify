import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  masterView: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 16,
    paddingLeft: 10
  },
  topItemText:{
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 24,
    paddingBottom: 10,
  },
  welcomeView: {
    alignItems: "center",
    flexDirection: "row",
  },
  renderingText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 16,
  },
  songOrArtistView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#434343",
    width: windowWidth * 0.95,
    height: 80,
    borderRadius: 10,
  },
  buffer: {
    height: 25,
  },
});
