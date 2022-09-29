import { getAudioFeaturesOfSong } from "@src/utils/Queries";

//function that returns the top 5 attributes from a users top 50 track
//topTracks is an array of tracks
//numTopAttributes is the number of top attributes you want returned ex. 5 would return top 5 attributes
export async function getStatisticsFromTopSongs(topTracks, numTopAttributes) {
  const topTracksAttributes = [];
  var avgAcousticness = 0;
  var avgDancability = 0;
  var avgDurationMs = 0;
  var avgEnergy = 0;
  var avgIntrumentalness = 0;
  var avgLoudness = 0;
  var avgLiveness = 0;
  var avgTempo = 0;
  var avgValence =0;
  var avgPopularity = 0;
  for (var i = 0; i < topTracks.length; i++) {
    topTracksAttributes[i] = await getAudioFeaturesOfSong(topTracks[i].id);
    avgPopularity += topTracks[i].popularity;
    avgValence += topTracksAttributes[i].valence;
    avgTempo += topTracksAttributes[i].tempo;
    avgLiveness += topTracksAttributes[i].Live;
    avgLoudness += topTracksAttributes[i].loudness;
    avgIntrumentalness += topTracksAttributes[i].instrumentalness;
    avgEnergy += topTracksAttributes[i].energy;
    avgDurationMs += topTracksAttributes[i].duration_ms;
    avgDancability+= topTracksAttributes[i].dancability;
    avgAcousticness += topTracksAttributes[i].acousticness;
  }
  avgPopularity /= topTracks.length;
  avgValence /= topTracks.length;
  avgTempo /= topTracks.length;
  avgLiveness /= topTracks.length;
  avgLoudness /=topTracks.length;
  avgIntrumentalness /=topTracks.length;
  avgEnergy /=topTracks.length;
  avgDurationMs /=topTracks.length;
  avgDancability/=topTracks.length;
  avgAcousticness /= topTracks.length;

}
