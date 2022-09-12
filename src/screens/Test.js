import { getTopArtistsOrSongs, getTopArtistsOrTracks, getAudioAnalysisOfSong, getRecommendations, getRecommendationsAdvanced } from "../utils/Queries";
import { Button, SafeAreaView, View } from 'react-native';

const payload = {
    'seed_artists': "4YjpqCSDD7zwMQgPYJMqb0,7Hvq85OU8T7Hsd63zNBwaL,"+
    "2wXUKlYvdBHn2MNeRKgG6W",
    'seed_genres' : "",
    'seed_tracks' : "",
    'limit': 5,
  }

const Test = ({ navigation })=>{
    return (
        <SafeAreaView>
          <Button title = 'test' onPress={() => (getRecommendationsAdvanced(payload))}/>
        </SafeAreaView>
    );
}

export default Test;