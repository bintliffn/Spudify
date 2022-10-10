import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export const styles = StyleSheet.create({
    masterView: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        margin : 10,
        flex: 1,
        width : windowWidth*.95,
      },
      welcomeText: {
        color: "#FFFFFF",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
        fontSize: 24,
        fontWeight : "bold",
        paddingTop: 10,
      },
      buttonText: {
        color: "#B3B3B3",
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
        backgroundColor : "#212121",
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
        //justifyContent: "flex-start",
        flex: 1
      },

});