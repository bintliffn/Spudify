import * as React from "react";
import { getRequestedPlaylist } from "../../../utils/Queries";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import Song from "@src/components/DisplaySong/Song";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../utils";

const SpotifyPlaylists = ({ route, navigation }) => {
  const [display, setDisplay] = React.useState(false);

  const [requestedPlaylist, setRequestedPlaylist] = React.useState();

  async function testFunc() {
    const requestedPlaylistResponse = await getRequestedPlaylist(
      route.params.playlistId
    );

    setRequestedPlaylist(requestedPlaylistResponse);

    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    <SafeAreaView>
      {display ? (
        <View style={[styles.View]}>
          <View style={[styles.upperPlaylistSongsView]}>
            <Ionicons
              name="arrow-back-circle-outline"
              color="white"
              size={40}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
            <Text style={[styles.innerPlaylistSongsView]}>
              Songs in your playlist
            </Text>
          </View>

          <FlatList
            data={requestedPlaylist.tracks.items}
            renderItem={(item) => {
              return (
                <View style={[styles.container]}>
                  <Song SingleJsonSong={item.item.track} />
                </View>
              );
            }}
          />
        </View>
      ) : null }
    </SafeAreaView>
  );
};
export default SpotifyPlaylists;
