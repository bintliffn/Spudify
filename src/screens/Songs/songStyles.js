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
    height: windowHeight
  },
  scrollView: {
    paddingBottom: windowHeight * .25
  },
  parentView: {
    height: windowHeight*1.15
  },
});
