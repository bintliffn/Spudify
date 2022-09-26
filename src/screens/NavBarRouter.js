import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Screens
import Home from "./home";
import Playlists from "./playlists";
import Songs from "./songs";
import Profile from "./profile";
import Test from "./Test";

const Tab = createMaterialBottomTabNavigator();

const homeScreen = "Home";
const playlistsScreen = "Playlists";
const songsScreen = "Songs";
const profileScreen = "Profile";

export default function NavBarRouter() {
  return (
    <Tab.Navigator
      initialRouteName={homeScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size = 25 }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeScreen) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === playlistsScreen) {
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
      <Tab.Screen name={playlistsScreen} component={Playlists} />
      <Tab.Screen name={profileScreen} component={Profile} />
      <Tab.Screen name="Test" component={Test} />
    </Tab.Navigator>
  );
}
