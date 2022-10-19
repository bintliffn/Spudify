//Reusable component to display a playlist in your screen
//Can be used
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from "react-native";

import { styles } from "@src/screens/profile/utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



function Playlist({isUserPlaylist, playlistTracksTotal, item}) {
  return (
    <View style={[styles.container]}>
      {playlistTracksTotal[item.index] ? (  
          <View style={[styles.innerContainer]}>
            <Image
              style={[styles.coverImage]}
              source={{ uri: isUserPlaylist ? item.item.images[0].url : item.item[0].album.images[0].url }}
            />
            <View style={[styles.innerView]}>
              <Text style={[styles.playlistText]}>{ isUserPlaylist? item.item.name : item.item.playlistName}</Text>
            </View>
          </View>
      ) : (
        <View style={[styles.innerContainer]}>
          <MaterialCommunityIcons
            name="album"
            style={[styles.defaultCoverAlbum]}
            size={60}
            color="white"
          />
          <View style={[styles.innerView]}>
            <Text style={[styles.playlistText]}>{item.item.name}</Text>
            <Text style={[styles.artistText]}>Empty Playlist</Text>
          </View>
        </View>
      )}
    </View>
  );
}
export default Playlist;