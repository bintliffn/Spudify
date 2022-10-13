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
import Ionicons from "react-native-vector-icons/Ionicons";


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
        <View style={{flexDirection: "row", alignItems : "center"}}>
             <Ionicons
              name="arrow-back-circle-outline"
              color="white"
              size={40}
              onPress={() => {
                navigation.navigate("Playlists");
              }}
            />
          <Text style={[styles.playlistText]}>Songs in your playlist</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={playlistSongs}
            contentContainerStyle={{ paddingBottom: 100}}
            renderItem={(item) => {
              return <Song SingleJsonSong={item.item} />;
            }}
          />
        </View>
      ) : null }
    </SafeAreaView>
  );
};
export default RecommendedPlaylists;
