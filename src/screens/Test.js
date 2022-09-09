import { getTopArtistsOrSongs } from "../utils/Queries";
import { Button, SafeAreaView, View } from 'react-native';

const Test = ({ navigation })=>{
    return (
        <SafeAreaView>
          <Button title = 'test' onPress={() => (getTopArtistsOrSongs('artists'))}/>
        </SafeAreaView>
    );
}

export default Test;