//currently working and receiving access token/ refresh token
//need to make it so Post request to get token triggers after successful get code request not on USeState how it is now
//need to find a way to store the client secret not in plain text
//need to figure out how to store refresh token / access token for use in API calls
import axios from "axios";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import { getNewToken } from "@src/utils/RefreshToken";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { SafeAreaView, Image, Text, View, processColor } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "@src/screens/login/utils";

const querystring = require("querystring");
const Buffer = require("buffer").Buffer;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

function LoginScreen({ navigation }) {
  const [loggedInStatus, setLoggedInStatus] = React.useState(false);

  WebBrowser.maybeCompleteAuthSession();
  // Endpoint
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  function login() {
    promptAsync();
    console.log(makeRedirectUri());
    //setLoggedInStatus(true);
  }

  function logout() {
    SecureStore.deleteItemAsync("access_token");
    SecureStore.deleteItemAsync("refresh_token");
    SecureStore.deleteItemAsync("token_expriration");
    setLoggedInStatus(false);
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      //will need to be stored securely
      clientId: "58c38efab4da4d3996627f385f337bd1",
      scopes: [
        "user-read-currently-playing",
        "user-follow-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  //when response variable changes run the code below to exchange authenication code for authentication token /refresh token
  React.useEffect(() => {
    if (response?.type === "success") {
      setLoggedInStatus(true);
      console.log("RESPONSE SUCCESS");

      //retreive authentication code if user successfully logged in
      const { code } = response.params;
      //send post request using authentication code to get authentication token
      axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: makeRedirectUri(),
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${new Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }) //handle the response
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            SecureStore.setItemAsync(
              "access_token",
              JSON.stringify(response.data.access_token)
            );
            SecureStore.setItemAsync(
              "refresh_token",
              JSON.stringify(response.data.refresh_token)
            );
            SecureStore.setItemAsync(
              "token_expriration",
              JSON.stringify(response.data.expires_in)
            );
            setLoggedInStatus(true);
          } else {
            // res.send(response);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, [response]);

  //when Screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      //if the accessToken is stored
      SecureStore.getItemAsync("access_token").then((data) => {
        if (data != null) {
          getNewToken();
          //set logged in to true
          setLoggedInStatus(true);
        }
      });
    }, [])
  );

  /*display button
  when the button is pressed begin authentication process by calling promptAsync function*/
  return (
    <SafeAreaView>
      {loggedInStatus ? (
        <View style={[styles.view]}>
          <Button
            title="test"
            compact
            mode="contained"
            contentStyle={{ height: "100%" }}
            style={[styles.button]}
            onPress={() => navigation.navigate("NavBarRouter")}
          >
            {"Test"}
          </Button>

          <Button
            title="logout"
            compact
            mode="contained"
            contentStyle={{ height: "100%" }}
            style={[styles.button]}
            onPress={() => logout()}
          >
            {"Logout"}
          </Button>
        </View>
      ) : (
        <View style={[styles.view]}>
          <Image
            style={[styles.logo]}
            source={require("@assets/spotify_logo.png")}
          ></Image>
          <Text style={[styles.titleText]}>Spudify</Text>
          <Text style={[styles.bodyText]}>Login to start your journey!</Text>
          <Button
            title="login"
            compact
            mode="contained"
            contentStyle={{ height: "100%" }}
            uppercase={false}
            style={[styles.button]}
            onPress={() => login()}
          >
            <Text style={[styles.loginButtonText]}>Login</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

export default LoginScreen;
