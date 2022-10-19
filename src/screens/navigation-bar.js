import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Screens
import Home from "@src/screens/home";
import Recommend from "@src/screens/recommendations";
import Songs from "@src/screens/songs";
import Profile from "@src/screens/profile";

const Tab = createMaterialBottomTabNavigator();

const homeScreen = "Home";
const recommendScreen = "Recommend";
const songsScreen = "Songs";
const profileScreen = "Profile";

export default function NavigationBar() {
  return (
    <Tab.Navigator
      initialRouteName={homeScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size = 25 }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeScreen) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === recommendScreen) {
            iconName = focused ? "book" : "book-outline";
          } else if (rn === songsScreen) {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (rn === profileScreen) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === "Test") {
            iconName = focused ? "alert-circle" : "alert-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      barStyle={{ backgroundColor: "transparent" }}
    >
      <Tab.Screen name={homeScreen} component={Home} />
      <Tab.Screen name={songsScreen} component={Songs} />
      <Tab.Screen name={recommendScreen} component={Recommend} />
      <Tab.Screen name={profileScreen} component={Profile} />
    </Tab.Navigator>
  );
}
