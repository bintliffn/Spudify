import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@src/components/DisplayArtist/ArtistStyles";

//MUST PASS IN A SINGLE Artist FOR CODE TO WORK

function Artist({ SingleJsonArtist }) {
  //extract the song name, album name, and artist name for a track
  let artistName = SingleJsonArtist.name;
  const [artistImageUrl, setArtistImageUrl] = React.useState("");

  React.useEffect(() => {
    //extract album cover image of 320 x 320 size ( for higher resolution)
    try {
      setArtistImageUrl(SingleJsonArtist.images[1].url);
    } catch (error) {}
  }, []);

  return (
    <SafeAreaView style={[styles.safeView]}>
      <Image
        style={[styles.image]}
        source={
          artistImageUrl === ""
            ? require("@root/assets/spotify_logo.png")
            : { uri: `${artistImageUrl}` }
        }
      />
      <View style={[styles.artistNameView]}>
        <Text style={[styles.artistText]}>{artistName}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Artist;
