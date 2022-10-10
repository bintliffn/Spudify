import * as React from "react";
import { getUserPlaylist, getRequestedPlaylist } from "../../../utils/Queries";
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
import { styles } from "../utils";

const SpotifyPlaylists = ({ route, navigation }) => {
  const [display, setDisplay] = React.useState(false);

  const [userPlaylists, setUserPlaylists] = React.useState();
  const [userPlaylistsTotal, setUserPlaylistsTotal] = React.useState();
  const [requestedPlaylist, setRequestedPlaylist] = React.useState();

  async function testFunc() {
    const requestedPlaylistResponse = await getRequestedPlaylist(
      route.params.playlistId
    );

    setRequestedPlaylist(requestedPlaylistResponse);

    // console.log(requestedPlaylist.tracks.items[0].track.name);

    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  // requestedPlaylist.tracks.items

  return (
    <SafeAreaView>
      {display ? (
        <View style={[styles.view]}>
          <Text style={[styles.playlistText]}>Songs in your playlist</Text>
          <FlatList
            data={requestedPlaylist.tracks.items}
            renderItem={(item) => {
              return <Song SingleJsonSong={item.item.track} />;
            }}
          />
        </View>
      ) : (
        <Text style={[styles.profileText]}>RENDERING DATA</Text>
      )}
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        title="Learn More"
        color="#841584"
      />
    </SafeAreaView>
  );
};
export default SpotifyPlaylists;
