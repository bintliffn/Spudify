//currently working and receiving access token/ refresh token
//need to make it so Post request to get token triggers after successful get code request not on USeState how it is now
//need to find a way to store the client secret not in plain text
//need to figure out how to store refresh token / access token for use in API calls
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
  fetchUserInfoAsync,
} from "expo-auth-session";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "./utils";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getNewToken } from "../../utils/RefreshToken";
import { getRecentlyPlayed } from "../../utils/Queries";

const querystring = require("querystring");
const Buffer = require("buffer").Buffer;
const spotify_logo = "../../../assets/spotify_logo.png";

const CLIENT_ID = "58c38efab4da4d3996627f385f337bd1";
const CLIENT_SECRET = "79cd7ebaf39c4437a8418daa887b7fae";

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
          console.log(request.status);
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
          console.log(error);
        });
    }
  }, [response]);

  //when Screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      console.log("called");
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
    <View style={[styles.parentView]}>
      {loggedInStatus ? (
        <View style={[styles.dashboardView]}>
          <Button
            title="test"
            compact
            mode="contained"
            color="#1DB954"
            onPress={() => navigation.navigate("Test")}
          >
            {"Test"}
          </Button>
          <Button
            title="logout"
            compact
            mode="contained"
            color="#1DB954"
            onPress={() => logout()}
          >
            {"Logout"}
          </Button>
        </View>
      ) : (
        <View style={[styles.loginPageView]}>
          <Image style={[styles.logo]} source={require(spotify_logo)}></Image>
          <Text style={[styles.titleText]}>Spudify</Text>
          <Text style={[styles.bodyText]}>Login to start your journey!</Text>
          <Button
            title="login"
            compact
            mode="contained"
            color="#1DB954"
            uppercase={false}
            style={[styles.loginButton]}
            onPress={() => login()}
          >
            <Text style={[styles.loginButtonText]}>Login</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

export default LoginScreen;
