import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@src/components/DisplayArtist/ArtistStyles";

//MUST PASS IN A SINGLE Artist FOR CODE TO WORK

function Artist({ SingleJsonArtist }) {
  //extract the song name, album name, and artist name for a track
  let artistName = SingleJsonArtist.name;

  //extract album cover image of 320 x 320 size ( for higher resolution)
  let artistImageUrl = SingleJsonArtist.images[1].url;

  return (
    <SafeAreaView style={[styles.safeView]}>
      <Image
        style={[styles.image]}
        source={{
          uri: artistImageUrl,
        }}
      />
      <View style={[styles.artistNameView]}>
      <Text style={[styles.artistText]}>{artistName}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Artist;