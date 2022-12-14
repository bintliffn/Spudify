import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  masterView: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    flex: 1,
    width : windowWidth*.95
  },
  welcomeText: {
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 24,
    fontWeight : "bold"
  },
  topItemText:{
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 20,
    paddingBottom: 10,
  },
  noContentText:{
    color: "#B3B3B3",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 20,
    paddingBottom: 10,
  },
  welcomeView: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop : 15
  },
  scrollView : {
    showsVerticalScrollIndicator : false,
    directionalLockEnabled : true,
  },
  songOrArtistView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
    width: windowWidth * 0.95,
    height: 80,
    borderRadius: 10,
    
  },
  buffer: {
    height: 25,
  },
  statsView: {
    marginLeft : 20,
    width : windowWidth*.9,
  },
  highlightedWord:{
    color : "#1DB954"
  },
});
