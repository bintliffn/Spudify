import * as React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  Button,
} from "react-native";
import Song from "@src/components/DisplaySong/Song";
import { styles } from "../playlistStyles";

const RecommendedPlaylists = ({ route, navigation }) => {
  const [display, setDisplay] = React.useState(false);

  const [playlistSongs, setPlaylistSongs] = React.useState();

  async function testFunc() {
    setPlaylistSongs(route.params.playlistSongs);
    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  // requestedPlaylist.tracks.items

  return (
    <SafeAreaView style = {{flex : 1}}>
      {display ? (
        <View style={[styles.masterView]}>
          <Text style={[styles.playlistText]}>Songs in your playlist</Text>
          <Button
            onPress={() => {
              navigation.navigate("Playlists");
            }}
            title="Return"
            color="#1DB954"
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={playlistSongs}
            contentContainerStyle={{ paddingBottom: 100}}
            renderItem={(item) => {
              return <Song SingleJsonSong={item.item} />;
            }}
          />
        </View>
      ) : (
        <Text style={[styles.profileText]}>RENDERING DATA</Text>
      )}
    </SafeAreaView>
  );
};
export default RecommendedPlaylists;
