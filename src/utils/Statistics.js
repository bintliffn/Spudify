import { getAudioFeaturesOfSong } from "@src/utils/Queries";
import * as SecureStore from "expo-secure-store";

//function that returns average values of certain attributes from a users top 50 tracks
//topTracks is an array of tracks
export async function getStatisticsFromTopSongs(topTracks) {
  const topTracksAttributes = [];
  var avgAcousticness = 0;
  var avgDanceability = 0;
  var avgDurationMs = 0;
  var avgEnergy = 0;
  var avgIntrumentalness = 0;
  var avgLoudness = 0;
  var avgLiveness = 0;
  var avgTempo = 0;
  var avgValence = 0;
  var avgPopularity = 0;
  for (var i = 0; i < topTracks.length; i++) {
    topTracksAttributes[i] = await getAudioFeaturesOfSong(topTracks[i].id);
    avgPopularity += topTracks[i].popularity;
    avgValence += topTracksAttributes[i].valence;
    avgTempo += topTracksAttributes[i].tempo;
    avgLiveness += topTracksAttributes[i].liveness;
    avgLoudness += topTracksAttributes[i].loudness;
    avgIntrumentalness += topTracksAttributes[i].instrumentalness;
    avgEnergy += topTracksAttributes[i].energy;
    avgDurationMs += topTracksAttributes[i].duration_ms;
    avgDanceability += topTracksAttributes[i].danceability;
    avgAcousticness += topTracksAttributes[i].acousticness;
  }
  avgPopularity /= topTracks.length;
  avgValence /= topTracks.length;
  avgTempo /= topTracks.length;
  avgLiveness /= topTracks.length;
  avgLoudness /= topTracks.length;
  avgIntrumentalness /= topTracks.length;
  avgEnergy /= topTracks.length;
  avgDurationMs /= topTracks.length;
  avgDanceability /= topTracks.length;
  avgAcousticness /= topTracks.length;

  const attributes = {
    popularity: avgPopularity,
    valence: avgValence,
    tempo: avgTempo,
    liveness: avgLiveness,
    loudness: avgLoudness,
    instrumentalness: avgIntrumentalness,
    energy: avgEnergy,
    duration_ms: avgDurationMs,
    danceability: avgDanceability,
    acousticness: avgAcousticness,
  };
  return attributes;
}
