import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseURL = 'https://api.spotify.com/v1/';



//Working
export async function getRecentlyPlayed() {
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
//also must pass time_range (valid values are long_term, medium_term, short_term) and limit (1-50)
//working
export async function getTopArtistsOrTracks(artistsOrTracks, time_range, limit) {
  const accessToken = await SecureStore.getItemAsync("access_token");
    axios({
      method: 'get',
      url: `${baseURL}me/top/${artistsOrTracks}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken,
      },
      params :{
        'time_range': `${time_range}`,
        'limit': `${limit}`
      }
    }) //handle the response
      .then(response => {
        //returns array of songs/artists (array contains a lot of information about the song/artist that will need to be extracted in a later step)
        return response.data.items;
      })
      .catch(error => {
        console.log(error);
      });
}

//working
export async function getAudioAnalysisOfSong (trackId) {
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
        //returns audio analysis of the track
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
}

//Working
//returns recommendations based off of up to 5 artists/songs/genres (any combination of the 3 up to 5 parameters total) 
//(artists or  songs must be passed as their Spotify Id's)
//Artists/Genres/Tracks must be passed as comma seperated values ex. track1,track2,track3
export async function getRecommendations (artists,genres,tracks, limit) {
  const accessToken = await SecureStore.getItemAsync("access_token");
    axios({
      method: 'get',
      url: `${baseURL}recommendations`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken,
      },
      params :{
        'seed_artists': artists,
        'seed_genres' : genres,
        'seed_tracks' : tracks,
        'limit': limit,
      }
    }) //handle the response
      .then(response => {
        //returns array of songs(array contains a lot of information about the song/artist that will need to be extracted in a later step)
        return response.data.tracks;
      })
      .catch(error => {
        console.log(error);
      });
}