import React from "react";
import { View, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "./utils";

function NavBar() {
  return (
    <SafeAreaView>
      <Appbar>
        <Appbar.Action icon="" onPress={() => {}} />
        <Appbar.Action icon="" onPress={() => {}} />
        <Appbar.Action icon="" onPress={() => {}} />
        <Appbar.Action icon="" onPress={() => {}} />
      </Appbar>
    </SafeAreaView>
  );
}

export default NavBar;
