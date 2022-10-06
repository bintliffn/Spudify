import * as React from "react";
import {
  getUserInfo,
  getUserFollowing,
  getUserPlaylist,
} from "../../utils/Queries";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  Pressable,
  TouchableHighlight,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./utils";

const spotify_logo = "../../../assets/spotify_logo.png";
const playlistTracksTotalTemp = new Array();

const Profile = ({ navigation }) => {
  const [display, setDisplay] = React.useState(false);
  const [hasProfilePic, setHasProfilePic] = React.useState(false);
  const [hasPlaylists, setHasPlaylists] = React.useState(false);
  const [playlistTracksTotal, setPlaylistTracksTotal] = React.useState([]);

  const [userName, setUserName] = React.useState();
  const [userFollowing, setUserFollowing] = React.useState();
  const [userImage, setUserImage] = React.useState();

  const [userFollowers, setUserFollowers] = React.useState();

  const [userPlaylists, setUserPlaylists] = React.useState();

  async function testFunc() {
    const test = await getUserInfo();
    setUserName(test.display_name);
    setUserFollowers(test.followers.total);

    if (test.images.length > 0) {
      setUserImage(test.images[0].url);
      setHasProfilePic(true);
    }

    const test2 = await getUserFollowing();
    setUserFollowing(test2.artists.total);

    const test3 = await getUserPlaylist();
    setUserPlaylists(test3.items);

    if (test3.total > 0) {
      setHasPlaylists(true);
      for (let a = 0; a < test3.total; a++) {
        if (test3.items[a].tracks.total > 0) {
          playlistTracksTotalTemp[a] = true;
        } else playlistTracksTotalTemp[a] = false;
      }
    }
    setPlaylistTracksTotal(playlistTracksTotalTemp);

    console.log(playlistTracksTotal);
    console.log(playlistTracksTotal[0]);
    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    <SafeAreaView>
      {display ? (
        <View>
          <View style={[styles.topView]}>
            <Text style={[styles.usernameText]}>{userName}</Text>
            {hasProfilePic ? (
              <Image
                style={[styles.profilepic]}
                source={{ uri: userImage }}
              ></Image>
            ) : (
              <Ionicons
                name="person"
                color="white"
                style={[styles.profilepic]}
                size={100}
              />
            )}
          </View>
          <View style={[styles.followTopView]}>
            <Text style={[styles.profileText]}> {userFollowers} </Text>
            <Text style={[styles.profileText]}> {userFollowing} </Text>
          </View>
          <View style={[styles.followBottomView]}>
            <Text style={[styles.profileText]}> Followers </Text>
            <Text style={[styles.profileText]}> Following </Text>
          </View>
          {hasPlaylists ? (
            <View style={[styles.container]}>
              {playlistTracksTotal[0] ? (
                <Image
                  style={[styles.image]}
                  source={{ uri: userPlaylists[0].images[0].url }}
                />
              ) : (
                <Ionicons
                  name="person"
                  color="white"
                  style={[styles.image]}
                  size={60}
                />
              )}
              <TouchableHighlight
                onPress={() => navigation.navigate("spotifyPlaylists")}
              >
                <Text style={[styles.playlistText]}>Spotify Playlists</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={[styles.container]}>
              <Ionicons
                name="person"
                color="white"
                style={[styles.image]}
                size={60}
              />
              <Text style={[styles.playlistText]}>No Playlists</Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={[styles.profileText]}> RENDERING DATA</Text>
      )}
    </SafeAreaView>
  );
};
export default Profile;
