import {
  getTopArtistsOrTracks,
  getAudioAnalysisOfSong,
  getRecommendations,
  getRecommendationsAdvanced,
  getRecentlyPlayed,
  getUserInfo,
  getUserFollowing,
} from "../utils/Queries";
<<<<<<< HEAD
import { Button, SafeAreaView, View , Text} from "react-native";
import Song from "../Components/DisplaySong/Song";
import React from "react";
import { StyleSheet } from "react-native";



=======
import { Button, SafeAreaView, View } from "react-native";
import Song from "../components/Song";
>>>>>>> 64a5bca043bd5800d0fce4f9013c823cc136ddbf

const payload = {
  seed_artists:
    "4YjpqCSDD7zwMQgPYJMqb0,7Hvq85OU8T7Hsd63zNBwaL," + "2wXUKlYvdBHn2MNeRKgG6W",
  seed_genres: "",
  seed_tracks: "",
  limit: 5,
};

<<<<<<< HEAD
=======
async function testFunc() {
  const test = await getUserFollowing();
}

>>>>>>> 64a5bca043bd5800d0fce4f9013c823cc136ddbf
const Test = ({ navigation }) => {
  const [display, setDisplay] = React.useState(false);
  const[jsonBody,setJsonBody] = React.useState();

  async function testFunc() {
    const test = await getRecentlyPlayed(5);
    setJsonBody(test[0].track);
    setDisplay(true)
  }

  React.useEffect(()=>{
      testFunc();
  },[])

  return (
    //work on displaying full songComponent
    <SafeAreaView>
      {display ?
      ( 
      <View style={[styles.view]}>
      <Song SingleJsonSong={jsonBody} style={[styles.song]}/>
      <Song SingleJsonSong={jsonBody} style={[styles.song]}/>
      <Song SingleJsonSong={jsonBody} style={[styles.song]}/>
         </View>):
         (<View>
            <Text >
              RENDERING DATA
              </Text>
         </View>)}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  song:{
    padding:10,
    margin: 100
},
view:{
  justifyContent: "center",
  alignItems: 'center'
}
});

export default Test;
