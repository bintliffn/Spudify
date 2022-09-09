import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseURL = 'https://api.spotify.com/v1/';

export default async function getRecentlyPlayed() {
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
          //returns array of songs (array contains a lot of information about the song that will need to be extracted in a later step)
            return response.data.items;
        })
        .catch(error => {
          console.log(error);
        });
}
//must pass either "tracks" or "artists" for function to work (retreives top artists or tracks for a user)
//also must pass time_range (valid values are long_term, medium_term, short_term)
//Need to test
export default async function getTopArtistsOrTracks(artistsOrTracks, time_range) {
  const accessToken = await SecureStore.getItemAsync("access_token");
    axios({
      method: 'get',
      url: `${baseURL}me/top/${artistsOrTracks}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken,
        'time_range': `${time_range}`
      },
    }) //handle the response
      .then(response => {
        //returns array of songs/artists (array contains a lot of information about the song/artist that will need to be extracted in a later step)
          return response.data.items;
      })
      .catch(error => {
        console.log(error);
      });
}
//need to test
export default async function getAudioAnalysisOfSong (trackId) {
  const accessToken = await SecureStore.getItemAsync("access_token");
    axios({
      method: 'get',
      url: `${baseURL}audio-features/${trackId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken,
      },
    }) //handle the response
      .then(response => {
        //returns array of songs/artists (array contains a lot of information about the song/artist that will need to be extracted in a later step)
          return response.data;
      })
      .catch(error => {
        console.log(error);
      });
}