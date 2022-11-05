//Screen to display the songs in  playlist
//Can be used by both recommendations and profile screen
import * as React from "react";
import { getRequestedPlaylist } from "../../utils/Queries";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Alert,
  TouchableHighlight,
} from "react-native";
import Song from "@src/components/DisplaySong/Song";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "../Profile/profileStyles";
import { Button } from "react-native-paper";
import {
  getUserInfo,
  createPlaylist,
  addTracksToPlaylist,
} from "../../utils/Queries";

const DisplayPlaylist = ({ route, navigation }) => {
  const [display, setDisplay] = React.useState(false);
  const [hideButton, setHideButton] = React.useState(false);

  const [requestedPlaylist, setRequestedPlaylist] = React.useState();
  //const [removeSong, setRemoveSong] = React.useState();

  async function loadPage() {
    try {
      if (route.params.isUserPlaylist) {
        const requestedPlaylistResponse = await getRequestedPlaylist(
          route.params.playlistId
        );
        setRequestedPlaylist(requestedPlaylistResponse.tracks.items);
        setHideButton(true);
      } else {
        setRequestedPlaylist(route.params.playlistSongs);
      }

      setDisplay(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Error, please ensure you are connected to the internet");
    }
  }

  async function addPlaylistToAccount(playlistName) {
    setHideButton(true);
    try {
      var userInfoResponse = await getUserInfo();
      var userId = userInfoResponse.id;
      var createPlaylistResponse = await createPlaylist(playlistName, userId);
      var playlistId = createPlaylistResponse.id;
      var playlistCopy = {...requestedPlaylist};
      var songUris = [];
      for (var i = 0; i < requestedPlaylist.length; i++) {
        songUris.push("spotify:track:" + playlistCopy[i].id);
      }
      addTracksToPlaylist(playlistId, songUris)
      Alert.alert("Successfully added playlist to your Spotify account");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error, please ensure you are connected to the internet and you have not already created a playlist with this name"
      );
    }
  }

  React.useEffect(() => {
    loadPage();
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
                   navigation.goBack()
              }}
            />
            <Text style={[styles.innerPlaylistSongsView]}>
              Songs in your playlist
            </Text>
          </View>
          {hideButton ? null  : (
            <View style={[styles.addPlaylistView]}>
              <TouchableHighlight
                onPress={() =>
                  addPlaylistToAccount("Generated Spudify Playlist")
                }
                style={[styles.addplaylistButton]}
              >
                <Text style={[styles.buttonText]}>
                  Add Playlist to your Spotify Account
                </Text>
              </TouchableHighlight>
            </View>
          )}

          <FlatList
            data={requestedPlaylist}
            contentContainerStyle={{ paddingBottom: 200 }}
            renderItem={(item) => {
              console.log(                        route.params.playlistId
                );
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
