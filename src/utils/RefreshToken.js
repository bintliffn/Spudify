import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const querystring = require('querystring');
const Buffer = require('buffer').Buffer;

const CLIENT_ID = '58c38efab4da4d3996627f385f337bd1';
const CLIENT_SECRET = '79cd7ebaf39c4437a8418daa887b7fae';

//function to get a new access token using the refresh token
export const getNewToken = async () => {
  //get refresh token from secure local storage
    let refresh_token = await SecureStore.getItemAsync("refresh_token");
    //remove parenthesis from token? (request won't work without this line)
    var refresh_token_prepped = JSON.parse(refresh_token);
    //send post request with axios
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
          grant_type : 'refresh_token',
          refresh_token: refresh_token_prepped
        }),
        headers: {
          Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }) //after request store the access token received
        .then(async response => {
          await SecureStore.setItemAsync("access_token", response.data.access_token);
        })
        .catch(error => {
          console.log(error.response.data);
        });

}