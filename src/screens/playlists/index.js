import * as React from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import {
  getTopArtistsOrTracks,
  getRecommendations,
  getRecommendationsAdvanced,
} from "@src/utils/Queries";
// import { styles } from "@src/screens/playlists/playlistStyles";
export default function Playlists({ navigation }) {
  //remove later (needs styles)
  return (
    <View>

    </View>
  );

}
//   const [display, setDisplay] = React.useState(false);
//   var topSongs;
//   var topArtists;
//   const [displayText, setDisplayText] = React.useState();
//   const [isEnabledDance, setIsEnabledDance] = React.useState(false);
//   const toggleSwitchDance = () =>
//     setIsEnabledDance((previousState) => !previousState);
//   const [isEnabledEnergy, setIsEnabledEnergy] = React.useState(false);
//   const toggleSwitchEnergy = () =>
//     setIsEnabledEnergy((previousState) => !previousState);
//   const [isEnabledHappy, setIsEnabledHappy] = React.useState(false);
//   const toggleSwitchHappy = () => {
//     setIsEnabledHappy((previousState) => !previousState);
//     if (isEnabledSad) {
//       setIsEnabledSad((previousState) => !previousState);
//     }
//   };
//   const [isEnabledSad, setIsEnabledSad] = React.useState(false);
//   const toggleSwitchSad = () => {
//     setIsEnabledSad((previousState) => !previousState);
//     if (isEnabledHappy) {
//       setIsEnabledHappy((previousState) => !previousState);
//     }
//   };

//   async function getSongRecommendationsByTracks() {
//     try {
//       //returns an array of 50 tracks
//       const songRecommendations = await getRecommendations(
//         "",
//         "",
//         topSongs,
//         50
//       );
//       //add what to do with this info here (likely resuable playlist component you can pass the songs into?)
//     } catch (error) {
//       alert(error);
//     }
//   }

//   async function getSongRecommendationsByArtists() {
//     try {
//       //returns an array of 50 tracks
//       const songRecommendations = await getRecommendations(
//         topArtists,
//         "",
//         "",
//         50
//       );
//       console.log(songRecommendations[0].name);
//       //add what to do with this info here (likely resuable playlist component you can pass the songs into?)
//     } catch (error) {
//       alert(error);
//     }
//   }

//   async function fetchData(dataToFetch) {
//     try {
//       const topSongsResponse = await getTopArtistsOrTracks(
//         "tracks",
//         "long_term",
//         5
//       );
//       var topSongsIds = "";
//       for (var i = 0; i < topSongsResponse.length; i++) {
//         topSongsIds += topSongsResponse[i].id + ",";
//       }
//       topSongs = topSongsIds;
//       const topArtistsResponse = await getTopArtistsOrTracks(
//         "artists",
//         "long_term",
//         5
//       );
//       var topArtistsIds = "";
//       for (var i = 0; i < topArtistsResponse.length; i++) {
//         topArtistsIds += topArtistsResponse[i].id + ",";
//       }
//       topArtists = topArtistsIds;
//       getSongRecommendationsByArtists();
//     } catch (error) {
//       alert(error);
//     }
//   }

//   React.useEffect(() => {
//     //fetch all data
//     fetchData();
//   }, []);

//   return (
//     <SafeAreaView style={[styles.masterView]}>
//       <Text style={[styles.welcomeText]}>Generate Recommendations</Text>
//       <Text style={[styles.bodyText]}>
//         Generate a curated recommendation playlist using your top spotify
//         artists or songs!
//       </Text>
//       <View style={[styles.rowView]}>
//         <View style={[styles.rowTextView]}>
//           <Text style={[styles.bodyText]}>Highly Danceable</Text>
//         </View>
//         <Switch
//           trackColor={{ false: "121212", true: "#1DB954" }}
//           ios_backgroundColor="#121212"
//           onValueChange={toggleSwitchDance}
//           value={isEnabledDance}
//         />
//       </View>
//       <View style={[styles.rowView]}>
//         <View style={[styles.rowTextView]}>
//           <Text style={[styles.bodyText]}>Highly Energetic</Text>
//         </View>
//         <Switch
//           trackColor={{ false: "121212", true: "#1DB954" }}
//           ios_backgroundColor="#121212"
//           onValueChange={toggleSwitchEnergy}
//           value={isEnabledEnergy}
//         />
//       </View>
//       <View style={[styles.rowView]}>
//         <View style={[styles.rowTextView]}>
//           <Text style={[styles.bodyText]}>Very Happy</Text>
//         </View>
//         <Switch
//           trackColor={{ false: "121212", true: "#1DB954" }}
//           ios_backgroundColor="#121212"
//           onValueChange={toggleSwitchHappy}
//           value={isEnabledHappy}
//         />
//       </View>
//       <View style={[styles.rowView]}>
//         <View style={[styles.rowTextView]}>
//           <Text style={[styles.bodyText]}>Very Sad</Text>
//         </View>
//         <Switch
//           trackColor={{ false: "121212", true: "#1DB954" }}
//           ios_backgroundColor="#121212"
//           onValueChange={toggleSwitchSad}
//           value={isEnabledSad}
//         />
//       </View>

//       <View style={[styles.buttonView]}>
//         <TouchableOpacity style={[styles.button]}>
//           <Text style={[styles.buttonText]}>From Top Songs</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button]}>
//           <Text style={[styles.buttonText]}>From Top Artists</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }
