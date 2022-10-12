import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";
import { StatusBar } from "react-native";
import { UserProvider } from "@src/components/contexts/UserProvider";
import { registerRootComponent } from "expo";

// Screens
import LoginScreen from "@src/screens/login";
import NavigationBar from "@src/screens/navigation-bar";

export const AuthContext = React.createContext();

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle("light-content", true);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    background: "#191414",
  },
};

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = React.useState(false);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        setLoggedInStatus(data);
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <UserProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            {loggedInStatus ? (
              <Stack.Screen name="NavigationBar" component={NavigationBar} />
            ) : (
              <Stack.Screen name="Login" component={LoginScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AuthContext.Provider>
  );
}

registerRootComponent(App);
