import LoginScreen from "./src/screens/LoginScreen";
import Test from "./src/screens/Test";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content', true);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    background: "#191414"
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
