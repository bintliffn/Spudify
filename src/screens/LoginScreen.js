//currently working and receiving access token/ refresh token
//need to make it so Post request to get token triggers after successful get code request not on USeState how it is now
//need to find a way to store the client secret not in plain text
//need to figure out how to store refresh token / access token for use in API calls
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { makeRedirectUri, useAuthRequest, ResponseType, fetchUserInfoAsync} from 'expo-auth-session';
import { Button } from 'react-native';
import axios from 'axios';

const querystring = require('querystring');
const Buffer = require('buffer').Buffer;

const CLIENT_ID = '58c38efab4da4d3996627f385f337bd1';
const CLIENT_SECRET = '79cd7ebaf39c4437a8418daa887b7fae';

const LoginScreen = () => {

  Linking.addEventListener('url', urlRedirect);


  function urlRedirect(url) {
    console.log("CALLED");
    if(!url) return;
    // parse and redirect to new url
    let { path, queryParams } = Linking.parse(url);
    console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
}



    WebBrowser.maybeCompleteAuthSession();
// Endpoint
  const discovery = {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

  const [request, response, promptAsync] = useAuthRequest(
    {
    //will need to be stored securely
      clientId: '58c38efab4da4d3996627f385f337bd1',
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );


  React.useEffect(() => {
    if (response?.type === 'success') {
        const { code } = response.params;
        console.log(code); 
          axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: makeRedirectUri()
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            },
          })
            .then(response => {
              if (response.status === 200) {
                //res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
                console.log(response.data);
              } else {
               // res.send(response);
               console.log(response.data)
              }
            })
            .catch(error => {
              console.log(error);
            });
          
    }
  })



  return (
    <Button
      title="Login"
      onPress={() => {
      promptAsync()}}
    />
  );
};

export default LoginScreen;