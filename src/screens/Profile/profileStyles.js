import { StyleSheet, Platform, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  upperProfileView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 25,
  },
  buttonText: {
    color: "#1DB954",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontSize: 15,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
  profilepic: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  usernameText: {
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 30,
  },
  followersText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  numberOfFollowersView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 25,
  },
  followersView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 40,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 70,
    width: windowWidth * 0.9,
    padding: 15,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 70,
    width: windowWidth * 0.9,
    padding: 10,
  },
  button: {
    borderRadius: 40,
    height: 40,
    justifyContent: "center",
    alignSelf: "flex-end",
    borderColor: "#1DB954",
    
    borderWidth: 0,
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
  coverImage: {
    width: 60,
    height: 60,
  },
  defaultCoverAlbum: {
    width: 60,
    height: 60,
    backgroundColor: "gray",
  },
  playlistHeaderText: {
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  playlistText: {
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
  upperPlaylistSongsView: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: windowWidth * 0.9,
    padding: 10,
  },
  innerPlaylistSongsView: {
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    fontWeight: "bold",
    fontSize: 23,
    paddingLeft: 20,
  }
});
