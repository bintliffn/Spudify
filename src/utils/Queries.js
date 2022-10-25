import * as SecureStore from "expo-secure-store";
import axios from "axios";

const baseURL = "https://api.spotify.com/v1/";

//Returns an array of 20 most recently played tracks
export async function getRecentlyPlayed() {
  //retreive access token from local storage
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  //send GET request to spotify
  const promise = axios({
    method: "get",
    url: `${baseURL}me/player/recently-played`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const dataPromise = promise.then((response) => response.data.items);
  return dataPromise;
}

//must pass either "tracks" or "artists" for function to work (retreives top artists or tracks for a user)
//also must pass time_range (valid values are long_term, medium_term, short_term) and limit (1-50)
export async function getTopArtistsOrTracks(
  artistsOrTracks,
  time_range,
  limit
) {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}me/top/${artistsOrTracks}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    params: {
      time_range: `${time_range}`,
      limit: `${limit}`,
    },
  });
  const dataPromise = promise.then((response) => response.data.items);
  return dataPromise;
}

//returns attribute values for a song (ex. dancability: .67)
//must pass in a trackid
export async function getAudioFeaturesOfSong(trackId) {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}audio-features/${trackId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//returns recommendations based off of up to 5 artists/songs/genres (any combination of the 3 up to 5 parameters total)
//You can pass empty strings if you do not want to use any combination of artists/songs/genres
//(artists or  songs must be passed as their Spotify Id's)
//genres are passes as a tring
//Artists/Genres/Tracks must be passed as comma seperated values ex. track1,track2,track3
//limit is the number of recommended tracks you want to recieve (max: 50)
export async function getRecommendations(artists, genres, tracks, limit) {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}recommendations`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    params: {
      seed_artists: artists,
      seed_genres: genres,
      seed_tracks: tracks,
      limit: limit,
    },
  });
  const dataPromise = promise.then((response) => response.data.tracks);
  return dataPromise;
}

//returns recommendations. The only parameter is a JSON object containing the parameters that should be added to the request
//This function will mainly be used in phase 2 when advanced recommendations can be used
export async function getRecommendationsAdvanced(jsonBody) {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}recommendations`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    params: jsonBody,
  });
  const dataPromise = promise.then((response) => response.data.tracks);
  return dataPromise;
}

//Returns information about a user such as their username/ number of followers/ profile image if they have one
//More info here https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
export async function getUserInfo() {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}me`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//returns info about what artists the user is following and how many artists the user follows
//More info about response here https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed
export async function getUserFollowing() {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}me/following`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    params: {
      type: "artist",
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//returns array of playlists that the artist follows or created
//More info about response here https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
export async function getUserPlaylist() {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}me/playlists`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//returns the requested playlist by the id of a playlist
//More info about response here: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
export async function getRequestedPlaylist(playlist_id) {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}playlists/${playlist_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//returns info about what song the user is currently playing
//More info about response here https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track
//Only works if there is a song currently playing otherwise returns 204 (need to handle this)
export async function getCurrentSongPlaying() {
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "get",
    url: `${baseURL}me/player/currently-playing`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//creates a playlist on a users account
export async function createPlaylist(playlistName, userId){
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "post",
    url: `${baseURL}users/${userId}/playlists`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: {
      name: `${playlistName}`,
      description : "Playlist created by the Spudify App"
    },
  });

  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

//function to add tracks to a playlist
//must pass a playlistid to add the tracks to and a 
//list of comma seperated track uris
export async function addTracksToPlaylist(playlistId, tracks){
  var accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken.includes('"')) {
    accessToken = JSON.parse(accessToken);
  }
  const promise = axios({
    method: "post",  
    url: `${baseURL}playlists/${playlistId}/tracks`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: {
      position: 0, 
      uris: tracks,
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
