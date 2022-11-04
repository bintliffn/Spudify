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

  const [requestedPlaylist, setRequestedPlaylist] = React.useState();

  async function loadPage() {
    try {
      if (route.params.isUserPlaylist) {
        const requestedPlaylistResponse = await getRequestedPlaylist(
          route.params.playlistId
        );
        setRequestedPlaylist(requestedPlaylistResponse.tracks.items);
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
    try {
      var userInfoResponse = await getUserInfo();
      var userId = userInfoResponse.id;
      var createPlaylistResponse = await createPlaylist(playlistName, userId);
      var playlistId = createPlaylistResponse.id;
      var songUris = requestedPlaylist;
      for (var i = 0; i < songUris.length; i++) {
        songUris[i] = "spotify:track:" + requestedPlaylist[i].id;
      }
      addTracksToPlaylist(playlistId, songUris);
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

  const removeItem = (id) => {
    let arr = requestedPlaylist.filter(function (item) {
      return item.id !== id;
    });
    setRequestedPlaylist(arr);
  };

  var deleteAlertFunc = (tempId) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to delete this song from the playlist?",
      [
        { text: "Yes", onPress: () => removeItem(tempId) },
        { text: "No", onPress: null },
      ],
      { cancelable: false }
    );
  };

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
          {route.params.isUserPlaylist ? null : (
            <Button
              onPress={() => addPlaylistToAccount("Generated Spudify Playlist")}
              title="add to spotify account"
              compact
              mode="contained"
              contentStyle={{ height: "100%" }}
              uppercase={false}
              style={[styles.button]}
            />
          )}

          {route.params.isUserPlaylist ? (
            <FlatList
              data={requestedPlaylist}
              contentContainerStyle={{ paddingBottom: 200 }}
              renderItem={(item) => {
                return (
                  <TouchableHighlight
                    style={[styles.safeView]}
                    onPress={() => console.log("userplaylist")}
                  >
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
          ) : (
            <FlatList
              data={requestedPlaylist}
              contentContainerStyle={{ paddingBottom: 200 }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => {
                return (
                  <TouchableHighlight
                    style={[styles.safeView]}
                    onPress={() => deleteAlertFunc(item.item.id)}
                  >
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
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default DisplayPlaylist;
