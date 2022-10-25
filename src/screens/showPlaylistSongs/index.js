//Screen to display the songs in  playlist
//Can be used by both recommendations and profile screen
import * as React from "react";
import {
  getRequestedPlaylist,
  removeSongsToPlaylist,
} from "../../utils/Queries";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Song from "@src/components/DisplaySong/Song";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../profile/utils";

const DisplayPlaylist = ({ route, navigation }) => {
  const [display, setDisplay] = React.useState(false);

  const [requestedPlaylist, setRequestedPlaylist] = React.useState();
  //const [removeSong, setRemoveSong] = React.useState();

  async function testFunc() {
    if (route.params.isUserPlaylist) {
      const requestedPlaylistResponse = await getRequestedPlaylist(
        route.params.playlistId
      );
      //setRemoveSong = await removeSongsToPlaylist(route.params.playlistId);
      setRequestedPlaylist(requestedPlaylistResponse);
    } else {
      setRequestedPlaylist(route.params.playlistSongs);
    }

    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  /*                         
                          1.need id for add and remove song function 
                                  probably add functions to showPlaylistSongs screen
                          2.only can affect USER'S playlist not ones made by others
                          3.have to differentiate from users and followed playlist
                          
                          3.5 NOTE: Prob want function to work for generated playlists as well 
                          but probably wont work unless add playlist to user's account works

                          4.track/song identification uses uri's which is unknown to user's 
                          and we dont have a search/display songs that user's can search 
                          for wanted songs
                          4.5 remove songs we can do but add is different 

                          */
  // console.log(removeSong);
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
                route.params.isUserPlaylist
                  ? navigation.navigate("Profile")
                  : navigation.navigate("Recommend");
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
                <TouchableHighlight>
                  <View style={[styles.container]}>
                    <Song
                      SingleJsonSong={
                        route.params.isUserPlaylist
                          ? item.item.track
                          : item.item
                      }
                    />
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default DisplayPlaylist;
