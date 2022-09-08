import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseURL = 'https://api.spotify.com/v1/';


export const getRecentlyPlayed = async() => {
    const accessToken = await SecureStore.getItemAsync("access_token");
      axios({
        method: 'get',
        url: `${baseURL}me/player/recently-played`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accessToken,
        },
      }) //handle the response
        .then(response => {
          //working (need to extract track ids/images/artists)
            console.log(response.data.items);
        })
        .catch(error => {
          console.log(error);
        });
}