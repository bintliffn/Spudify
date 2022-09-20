import React from "react";
import { View, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "./utils";

export default function NavBar() {
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
