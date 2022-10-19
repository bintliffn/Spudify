//Screen to display the songs in  playlist
//Can be used by both recommendations and profile screen
import * as React from "react";
import { getRequestedPlaylist } from "../../utils/Queries";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import Song from "@src/components/DisplaySong/Song";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../profile/utils";

const DisplayPlaylist = ({ route, navigation }) => {
  const [display, setDisplay] = React.useState(false);

  const [requestedPlaylist, setRequestedPlaylist] = React.useState();

  async function testFunc() {
    if (route.params.isUserPlaylist) {
      const requestedPlaylistResponse = await getRequestedPlaylist(
        route.params.playlistId
      );
      setRequestedPlaylist(requestedPlaylistResponse);
    } else {
      setRequestedPlaylist(route.params.playlistSongs);
    }

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
                route.params.isUserPlaylist ? navigation.navigate("Profile") : navigation.navigate("Recommend")
              }}
            />
            <Text style={[styles.innerPlaylistSongsView]}>
              Songs in your playlist
            </Text>
          </View>

          <FlatList
            data={
              route.params.isUserPlaylist
                ? requestedPlaylist.tracks.items
                : requestedPlaylist
            }
            contentContainerStyle={{ paddingBottom: 125 }}
            renderItem={(item) => {
              return (
                <View style={[styles.container]}>
                  <Song
                    SingleJsonSong={
                      route.params.isUserPlaylist ? item.item.track : item.item
                    }
                  />
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default DisplayPlaylist;
