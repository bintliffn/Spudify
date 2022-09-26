import { View, SafeAreaView, Image, Text } from "react-native";
import { getUserInfo, getTopArtistsOrTracks } from "@src/utils/Queries";
import React from "react";
import { styles } from "@src/screens/home/homeStyles";
import Song from "@src/components/DisplaySong/Song";
import Artist from "@src/components/DisplayArtist/Artist";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ navigation }) {
  const [display, setDisplay] = React.useState();

  const [username, setUsername] = React.useState();
  const [topSong, setTopSong] = React.useState();
  const [topArtist, setTopArtist] = React.useState();

  async function fetchData() {
    const userInfo = await getUserInfo();
    setUsername(userInfo.display_name);
    const topSongsResponse = await getTopArtistsOrTracks("tracks", "long_term", 10);
    setTopSong(topSongsResponse[0]);
    const topArtistsResponse = await getTopArtistsOrTracks("artists", "long_term", 10);
    setTopArtist(topArtistsResponse[0]);
    setDisplay(true);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {display ? (
        <View style={[styles.masterView]}>
          <View style={[styles.welcomeView]}>
            <Ionicons name="home" size={30} color="#1DB954" />
            <Text style={[styles.welcomeText]}>Welcome {username}!</Text>
          </View>
          <View style={[styles.buffer]} />
          <Text style={[styles.topItemText]}>Top Song</Text>
          <View style={[styles.songOrArtistView]}>
            <Song SingleJsonSong={topSong} />
          </View>
          <View style={[styles.buffer]} />
          <Text style={[styles.topItemText]}>Top Artist</Text>
          <View style={[styles.songOrArtistView]}>
            <Artist SingleJsonArtist={topArtist}/>
          </View>
          <View style={[styles.buffer]} />
          <Text style={[styles.topItemText]}>Recently Played</Text>
        </View>
      ) : (
        <Text style={[styles.renderingText]}>RENDERING DATA</Text>
      )}
    </SafeAreaView>
  );
}
