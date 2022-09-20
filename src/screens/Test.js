import {getTopArtistsOrTracks, getUserInfo, getAudioAnalysisOfSong, getRecommendations, getRecommendationsAdvanced, getRecentlyPlayed, getUserProfilePic } from "../utils/Queries";
import { Button, SafeAreaView, View } from 'react-native';
import Song from "../Components/Song";

const payload = {
    'seed_artists': "4YjpqCSDD7zwMQgPYJMqb0,7Hvq85OU8T7Hsd63zNBwaL,"+
    "2wXUKlYvdBHn2MNeRKgG6W",
    'seed_genres' : "",
    'seed_tracks' : "",
    'limit': 5,
  }

  async function testFunc(){
    const test = await getUserInfo();
    console.log(test);
  }
  

const Test = ({ navigation })=>{
    return (
        <SafeAreaView>
          <Button title = 'test' onPress={() => (testFunc())}/>
        </SafeAreaView>
    );
}

export default Test;