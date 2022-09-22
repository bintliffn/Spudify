import * as React from "react";
import { View, Text } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Profile")}
        style={{ fontSize: 26, fontWeight: "bold", color: "white" }}
      >
        Profile
      </Text>
    </View>
  );
}
