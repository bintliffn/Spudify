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
import { styles } from "./utils";

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
      setPlaylistTracksTotal(playlistTracksTotalTemp);
      setDisplay(true);
    }
    setPlaylistTracksTotal(playlistTracksTotalTemp);
    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    <SafeAreaView>
      {display ? (
        <View>
          <View style={[styles.upperProfileView]}>
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
            <View>
              <Text style={[styles.playlistHeaderText]}>
                {" "}
                Spotify Playlists{" "}
              </Text>
              <FlatList
                data={userPlaylists}
                renderItem={(item) => {
                  return (
                    <View style={[styles.container]}>
                      {playlistTracksTotal[item.index] ? (
                        <TouchableHighlight
                          onPress={() =>
                            navigation.navigate("spotifyPlaylists", {
                              playlistId: item.item.id,
                            })
                          }
                        >
                          <View style={[styles.innerContainer]}>
                            <Image
                              style={[styles.coverImage]}
                              source={{ uri: item.item.images[0].url }}
                            />
                            <View style={[styles.innerView]}>
                              <Text style={[styles.playlistText]}>
                                {item.item.name}
                              </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      ) : (
                        <View style={[styles.innerContainer]}>
                          <MaterialCommunityIcons
                            name="album"
                            style={[styles.defaultCoverAlbum]}
                            size={60}
                            color="white"
                          />
                          <View style={[styles.innerView]}>
                            <Text style={[styles.playlistText]}>
                              {item.item.name}
                            </Text>
                            <Text style={[styles.artistText]}>
                              Empty Playlist
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
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
