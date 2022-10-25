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
  TouchableHighlight,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./profileStyles";
import Playlist from "@src/components/DisplayPlaylist/Playlist";
import { AuthContext } from "@src/App";
import { Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const Profile = ({ navigation }) => {
  const playlistTracksTotalTemp = new Array();
  const { signIn } = React.useContext(AuthContext);
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
      for (let a = 0; a < test3.total && a < 20; a++) {
        if (test3.items[a].tracks.total > 0) {
          playlistTracksTotalTemp[a] = true;
        } else playlistTracksTotalTemp[a] = false;
      }
      setPlaylistTracksTotal(playlistTracksTotalTemp);
      setDisplay(true);
    }
    setPlaylistTracksTotal(playlistTracksTotalTemp);
    setDisplay(true);
  }

  async function logout() {
    setDisplay(false);
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("token_expriration");
    signIn(false);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    <SafeAreaView style = {{flex : 1}}>
      {display ? (
        <View style= {{flex : 1}}>
          <View style={[styles.upperProfileView]}>
          <TouchableHighlight onPress={() => logout()} style={[styles.button]}>
            <Text style={[styles.buttonText]}>Logout</Text>
          </TouchableHighlight>
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
            <Text style={[styles.usernameText]}>{userName}</Text>
          </View>
          <View style={[styles.numberOfFollowersView]}>
            <Text style={[styles.followersText]}> {userFollowers} </Text>
            <Text style={[styles.followersText]}> {userFollowing} </Text>
          </View>
          <View style={[styles.followersView]}>
            <Text style={[styles.followersText]}> Followers </Text>
            <Text style={[styles.followersText]}> Following </Text>
          </View>
          {hasPlaylists ? (
            <View style = {{flex : 1}}>
              <Text style={[styles.playlistHeaderText]}>
                {" "}
                Spotify Playlists{" "}
              </Text>
              <FlatList
                data={userPlaylists}
                renderItem={(item) => {
                  return (
                    <TouchableHighlight
                      onPress={() =>
                        navigation.navigate("DisplayPlaylist", {
                          playlistId: item.item.id,
                          isUserPlaylist: true,
                        })
                      }
                    >
                      <Playlist
                        playlistTracksTotal={playlistTracksTotal}
                        item={item}
                        isUserPlaylist={true}
                      />
                    </TouchableHighlight>
                  );
                }}
              />
            </View>
          ) : (
            <View style={[styles.container]}>
              <MaterialCommunityIcons
                name="album"
                style={[styles.defaultCoverAlbum]}
                size={60}
                color="white"
              />
              <Text style={[styles.playlistText]}> No Playlists </Text>
            </View>
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default Profile;
