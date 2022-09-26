import {
  getTopArtistsOrTracks,
  getAudioAnalysisOfSong,
  getRecommendations,
  getRecommendationsAdvanced,
  getRecentlyPlayed,
  getUserInfo,
  getUserFollowing,
} from "../utils/Queries";
import { Button, SafeAreaView, View, Text } from "react-native";
import Song from "@src/components/DisplaySong/Song";
import React from "react";
import { StyleSheet } from "react-native";
import Artist from "@src/components/DisplayArtist/Artist";

const payload = {
  seed_artists:
    "4YjpqCSDD7zwMQgPYJMqb0,7Hvq85OU8T7Hsd63zNBwaL," + "2wXUKlYvdBHn2MNeRKgG6W",
  seed_genres: "",
  seed_tracks: "",
  limit: 5,
};

const Test = ({ navigation }) => {
  const [display, setDisplay] = React.useState(false);
  const [jsonBody, setJsonBody] = React.useState();

  async function testFunc() {
    const test2 = await getTopArtistsOrTracks("artists","long_term",10);
    setJsonBody(test2[1]);
    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    //work on displaying full songComponent
    <SafeAreaView>
      {display ? (
        <View style={[styles.view]}>
          <Artist SingleJsonArtist={jsonBody}/>      
        </View>
      ) : (
        <View>
          <Text>RENDERING DATA</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  song: {
    padding: 10,
    margin: 100,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Test;
