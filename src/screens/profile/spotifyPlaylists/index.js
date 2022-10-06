import * as React from "react";
import { getUserPlaylist, getRequestedPlaylist } from "../../../utils/Queries";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import Song from "@src/components/DisplaySong/Song";
import { styles } from "../utils";

const SpotifyPlaylists = ({ navigation }) => {
  const [display, setDisplay] = React.useState(false);

  const [userPlaylists, setUserPlaylists] = React.useState();
  const [userPlaylistsTotal, setUserPlaylistsTotal] = React.useState();
  const [requestedPlaylist, setRequestedPlaylist] = React.useState();

  async function testFunc() {
    const test = await getUserPlaylist();

    setUserPlaylists(test.items);
    setUserPlaylistsTotal(test.total);

    const test2 = await getRequestedPlaylist(test.items[2].id);

    setRequestedPlaylist(test2);

    // console.log(requestedPlaylist.tracks.items[0].track.name);

    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    <SafeAreaView>
      {display ? (
        <View style={[styles.view]}>
          <Text style={[styles.playlistText]}>
            <Song
              SingleJsonSong={requestedPlaylist.tracks.items[0].track}
              style={[styles.song]}
            />
            <Song
              SingleJsonSong={requestedPlaylist.tracks.items[1].track}
              style={[styles.song]}
            />
            <Song
              SingleJsonSong={requestedPlaylist.tracks.items[2].track}
              style={[styles.song]}
            />
            <Song
              SingleJsonSong={requestedPlaylist.tracks.items[3].track}
              style={[styles.song]}
            />
          </Text>
        </View>
      ) : (
        <Text style={[styles.profileText]}>RENDERING DATA</Text>
      )}
    </SafeAreaView>
  );
};
export default SpotifyPlaylists;
