import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseURL = 'https://api.spotify.com/v1/';

//Returns an array of 20 most recently played tracks
export async function getRecentlyPlayed() {
  //retreive access token from local storage
    const accessToken = await SecureStore.getItemAsync("access_token");
    //send GET request to spotify
      axios({
        method: 'get',
        url: `${baseURL}me/player/recently-played`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accessToken,
        },
      }) //handle the response
        .then(response => {
          //returns array of tracks in JSON object format
            return response.data.items;
        })
        .catch(error => {
          console.log(error);
        });
}

//must pass either "tracks" or "artists" for function to work (retreives top artists or tracks for a user)
//also must pass time_range (valid values are long_term, medium_term, short_term) and limit (1-50)
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
        //returns array of tracks/artists depending on value passed in
        return response.data.items;
      })
      .catch(error => {
        console.log(error);
      });
}

//returns attribute values for a song (ex. dancability: .67)
//must pass in a trackid
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

//returns recommendations based off of up to 5 artists/songs/genres (any combination of the 3 up to 5 parameters total) 
//You can pass empty strings if you do not want to use any combination of artists/songs/genres
//(artists or  songs must be passed as their Spotify Id's)
//genres are passes as a tring
//Artists/Genres/Tracks must be passed as comma seperated values ex. track1,track2,track3
//limit is the number of recommended tracks you want to recieve (max: 50)
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
        //returns array of songs in JSON object
        return response.data.tracks;
      })
      .catch(error => {
        console.log(error);
      });
}

//Working
//returns recommendations. The only parameter is a JSON object containing the parameters that should be added to the request
//This function will mainly be used in phase 2 when advanced recommendations can be used
export async function getRecommendationsAdvanced (jsonBody) {
  const accessToken = await SecureStore.getItemAsync("access_token");
    axios({
      method: 'get',
      url: `${baseURL}recommendations`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken,
      },
      params : jsonBody,
    }) //handle the response
      .then(response => {
        //returns array of songs 
        return response.data.tracks;
      })
      .catch(error => {
        console.log(error);
      });
}

