import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export const styles = StyleSheet.create({
    masterView: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        margin : 10,
        flexGrow: 1,
        width : windowWidth*.95,
      },
      welcomeText: {
        color: "#FFFFFF",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
        fontSize: 24,
        fontWeight : "bold",
        paddingTop: 10,
      },
      buffer: {
        height: 25,
      },
      buttonText: {
        color: "#1DB954",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
        fontSize: 12,
        fontWeight : "bold",
        textAlignVertical: "center",
        textAlign: "center"
      },
      buttonView:{
        flexDirection: "row",
        alignItems : "center",
        justifyContent : "center",
      },
      button:{
        width : windowWidth*.35,
        height : 50,
        backgroundColor: "#434343",
        color : "#B3B3B3",
        justifyContent : "center",
        borderRadius : 40,
      },
      bodyText:{
        color: "#FFFFFF",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
        fontSize: 20,
        paddingBottom: 10,
        textAlignVertical: "center",
        textAlign: "center",
        paddingHorizontal : 10,
      },
      rowView:{
        flexDirection : "row",
        width : windowWidth*.75,
      },
      rowTextView:{
        alignItems: "flex-start",
        flex: 1
      },
      container: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        height: 70,
        width: windowWidth * 0.9,
        padding: 20,
      },
      image: {
        width: 60,
        height: 60,
      },
      playlistText: {
        color: "white",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 20,
      },
      flatList : {
      paddingBottom : 20
      }
});