import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { UserProvider } from "@src/components/contexts/UserProvider";
import { registerRootComponent } from "expo";
import UserScreen from "@src/screens/UserScreen";

// Screens
import Test from "@src/screens/Test";
import LoginScreen from "@src/screens/login";
import NavBarRouter from "@src/screens/NavBarRouter";
import RecommendedPlaylists from "@src/screens/playlists/ViewPlaylists"

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle("light-content", true);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    background: "#191414",
  },
};

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RecommendedPlaylists" component={RecommendedPlaylists} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="NavBarRouter" component={NavBarRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

registerRootComponent(App);
