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
  Button,
  Pressable,
} from "react-native";
import { IconButton } from "react-native-paper";
import { styles } from "./utils";

const spotify_logo = "../../../assets/spotify_logo.png";

const Profile = ({ navigation }) => {
  const [display, setDisplay] = React.useState(false);
  const [hasProfilePic, setHasProfilePic] = React.useState(false);

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

    setDisplay(true);
  }

  React.useEffect(() => {
    testFunc();
  }, []);

  return (
    // <SafeAreaView>
    //   <View style={[styles.mainContainer]}>
    //     <View style={[styles.topContainer]}>
    //       <Text style={[styles.profileText]}>hello world</Text>
    //     </View>
    //     <View style={[styles.topContainer]}>
    //       <Text style={[styles.profileText]}>hello tree</Text>
    //     </View>
    //     <View style={[styles.topContainer]}>
    //       <Text style={[styles.profileText]}>hello hell</Text>
    //     </View>
    //   </View>
    // </SafeAreaView>

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
              <IconButton
                icon="account"
                color="white"
                style={[styles.profilepic]}
                size={100}
              />
            )}
          </View>
          <View style={[styles.profileView]}>
            <Text style={[styles.profileText]}> {userFollowers} </Text>
            <Text style={[styles.profileText]}> {userFollowing} </Text>
          </View>
          <View style={[styles.profileView]}>
            <Text style={[styles.profileText]}> Followers </Text>
            <Text style={[styles.profileText]}> Following </Text>
          </View>
          <View style={[styles.container]}>
            <Image style={[styles.image]} source={require(spotify_logo)} />
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.playlistText]}>Spotify Playlists</Text>
            </Pressable>
          </View>
          <View style={[styles.container]}>
            <Image style={[styles.image]} source={require(spotify_logo)} />
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.playlistText]}>Generated Playlists</Text>
            </Pressable>
          </View>
          <View style={[styles.container]}>
            <Image style={[styles.image]} source={require(spotify_logo)} />
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.playlistText]}>
                Generated Top Artists/Songs
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text style={[styles.profileText]}> RENDERING DATA</Text>
      )}
    </SafeAreaView>
  );
};
export default Profile;
//{userPlaylists[0].name}
