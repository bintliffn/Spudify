import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseURL = 'https://api.spotify.com/v1/';


export const getRecentlyPlayed = () => {
    //temporary hardcoded
    const accessToken = "BQA7xanoSd8MA9H2-9StI8KVDSwRiPVSVNx3bgIOib703_JA-g17sT7p0d77lvTAowVyH_wpsWsZWZy4fYicuZzqgC35ubDLa8oMm3aHF5hCYIxhboc6BQqWkNRieHdqu_FQ8keAK7rbsH0WNCOv2VYZl1xmY4mqs8yDShpoGTLUPOBNFVQ0NwQADVzGmki2VEKZx-8kZpUMvkE_T3K_fYoCkzY39NFN0oTxY59FgvdAw31GLV6JSf04";
            axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accessToken,
        },
      }) //handle the response
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
}