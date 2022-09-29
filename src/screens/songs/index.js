import * as React from "react";
import { View, Text } from "react-native";

export default function Songs({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Songs")}
        style={{ fontSize: 26, fontWeight: "bold", color: "white" }}
      >
        Songs
      </Text>
    </View>
  );
}
