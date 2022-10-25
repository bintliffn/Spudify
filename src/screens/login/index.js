//currently working and receiving access token/ refresh token
//need to make it so Post request to get token triggers after successful get code request not on USeState how it is now
//need to find a way to store the client secret not in plain text
//need to figure out how to store refresh token / access token for use in API calls
import axios from "axios";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { SafeAreaView, Image, Text, View, LogBox } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "@src/screens/Login/loginStyles";
import { AuthContext } from "@src/App";

const querystring = require("querystring");
const Buffer = require("buffer").Buffer;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

function LoginScreen({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  WebBrowser.maybeCompleteAuthSession();
  // Endpoint
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  function login() {
    console.log(makeRedirectUri());
    promptAsync();
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
        "playlist-modify-private",
        "playlist-modify-public"
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
      signIn(true);
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
            signIn(true);
          } else {
            // res.send(response);
            alert(
              "Error signing in, Please ensure you are connected to the internet"
            );
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [response]);

  //when Screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      //if the accessToken is stored
      SecureStore.getItemAsync("access_token").then((data) => {
        if (data != null) {
          signIn(true);
        }
      });
    }, [])
  );

  // Ignores the warning for cycle between App.js --> login/index.js --> App.js
  // @TODO resolve error
  React.useEffect(() => {
    LogBox.ignoreLogs(["Require cycle:"]);
  }, []);

  /*display button
  when the button is pressed begin authentication process by calling promptAsync function*/
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

export default LoginScreen;
