import React from "react";
import { View, Button, SafeAreaView, Image } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./Utils";

//MUST PASS IN A SINGLE SONG FOR CODE TO WORK
//THIS IS DIFFERENT FOR DIFFERENT ENDPOINTS
//For recommendations/top tracks endpoints simply pass returnedArray[indexOfSongYouWantDataFor]
//For recently played tracks pass returnedArray[indexOfSongYouWantDataFor].track

function Song({ SingleJsonSong }) {
  //extract the song name, album name, and artist name for a track
  let songName = SingleJsonSong.name;
  let artistName = SingleJsonSong.artists[0].name;
  let albumName = SingleJsonSong.album.name;
  let durationSec = Math.round((SingleJsonSong.duration_ms / 1000) % 60);
<<<<<<< HEAD
=======
  if (durationSec < 10) {
    durationSec = "0" + durationSec;
  }
>>>>>>> d1ae80b4cb294a9e3728be783ed9bc82be026fb9
  let durationMin = Math.floor(SingleJsonSong.duration_ms / 1000 / 60);

  //extract album cover image of 300 x 300 size ( for higher resolution)
  let albumCoverUrl = SingleJsonSong.album.images[1].url;

  return (
    <SafeAreaView style={[styles.safeView]}>
      <Image
        style={[styles.image]}
        source={{
          uri: albumCoverUrl,
        }}
      />
      <View style={[styles.innerView]}>
        <Text style={[styles.songText]}>{songName}</Text>
        <Text style={[styles.artistText]}>{artistName}</Text>
      </View>
      <View style={[styles.DurationView]}>
        <Text style={[styles.artistText]}>
          {durationMin}:{durationSec}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Song;
