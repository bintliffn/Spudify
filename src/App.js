import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";
import { StatusBar } from "react-native";
import { UserProvider } from "@src/contexts/UserProvider";
import { registerRootComponent } from "expo";
import UserScreen from "@src/screens/UserScreen";
import * as SecureStore from "expo-secure-store";

// Screens
import LoginScreen from "@src/screens/Login";
import NavigationBar from "@src/screens/Navigation-Bar";
import DisplayPlaylist from "@src/screens/ShowPlaylistSongs";
import AdvancedRecommendations from "@src/screens/AdvancedRecommendations"
import Loading from "@src/screens/Loading";

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


  React.useEffect(() => {
    SecureStore.getItemAsync("access_token").then((data) => {
      if (data == null) {
        setLoggedInStatus(false);
      } else {
        setLoggedInStatus(true);
      }
    });
  }, []);


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
              <>
              <Stack.Screen name="NavigationBar" component={NavigationBar} />
              <Stack.Screen name="DisplayPlaylist" component={DisplayPlaylist} />
              <Stack.Screen name="AdvancedRecommendations" component={AdvancedRecommendations} />
              <Stack.Screen name="User" component={UserScreen} />
              </>
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
