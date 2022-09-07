import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const CLIENT_ID = '58c38efab4da4d3996627f385f337bd1';
const CLIENT_SECRET = '79cd7ebaf39c4437a8418daa887b7fae';
const querystring = require('querystring');
const Buffer = require('buffer').Buffer;


//need to get function to store new access token (working now though)

export const getNewToken = async () => {
    let refresh_token = await SecureStore.getItemAsync("refresh_token");
    var refresh_token_prepped = JSON.parse(refresh_token);
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
      }) //handle the response
        .then(async response => {
          await SecureStore.setItemAsync("access_token", response.data.access_token);
        })
        .catch(error => {
          console.log(error.response.data);
        });

}