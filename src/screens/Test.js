import { getTopArtistsOrSongs, getTopArtistsOrTracks, getAudioAnalysisOfSong, getRecommendationsArtists } from "../utils/Queries";
import { Button, SafeAreaView, View } from 'react-native';

const artists = ['4YjpqCSDD7zwMQgPYJMqb0']

const Test = ({ navigation })=>{
    return (
        <SafeAreaView>
          <Button title = 'test' onPress={() => (getRecommendationsArtists("4YjpqCSDD7zwMQgPYJMqb0,7Hvq85OU8T7Hsd63zNBwaL,"+
          "2wXUKlYvdBHn2MNeRKgG6W","","",5))}/>
        </SafeAreaView>
    );
}

export default Test;