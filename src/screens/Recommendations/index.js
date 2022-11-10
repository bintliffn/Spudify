import * as React from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Switch,
  Alert,
  FlatList,
  TouchableHighlight,
  Image,
  ScrollView,
  LogBox,
} from "react-native";
import {
  getTopArtistsOrTracks,
  getRecommendations,
  getRecommendationsAdvanced,
} from "@src/utils/Queries";
import { styles } from "@src/screens/Recommendations/recommendationStyles";
import Playlist from "@src/components/DisplayPlaylist/Playlist";
import { DeviceEventEmitter } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { mdiConsoleLine } from "@mdi/js";
import Tooltip from "react-native-walkthrough-tooltip";

export default function Playlists({ route, navigation }) {
  DeviceEventEmitter.addListener("event.advancedPayload", (eventData) =>
    handleAdvancedPayload(eventData)
  );

  const [showTip, setTip] = React.useState(false);
  const [advancedPayload, setAdvancedPayload] = React.useState("");
  const [playlistCount, setPlaylistCount] = React.useState(1);
  const [playlists, setPlaylists] = React.useState([]);
  const [topSongs, setTopSongs] = React.useState([]);
  const [topArtists, setTopArtists] = React.useState([]);
  const [displayText, setDisplayText] = React.useState();
  const [isEnabledDance, setIsEnabledDance] = React.useState(false);
  const toggleSwitchDance = () =>
    setIsEnabledDance((previousState) => !previousState);
  const [isEnabledEnergy, setIsEnabledEnergy] = React.useState(false);
  const toggleSwitchEnergy = () =>
    setIsEnabledEnergy((previousState) => !previousState);
  const [isEnabledHappy, setIsEnabledHappy] = React.useState(false);
  const toggleSwitchHappy = () => {
    setIsEnabledHappy((previousState) => !previousState);
    if (isEnabledSad) {
      setIsEnabledSad((previousState) => !previousState);
    }
  };
  const [isEnabledSad, setIsEnabledSad] = React.useState(false);
  const toggleSwitchSad = () => {
    setIsEnabledSad((previousState) => !previousState);
    if (isEnabledHappy) {
      setIsEnabledHappy((previousState) => !previousState);
    }
  };
  const [isEnabledObscure, setIsEnabledObscure] = React.useState(false);
  const toggleSwitchObscure = () => {
    setIsEnabledObscure((previousState) => !previousState);
  };

  const [playlistTracksTotal, setPlaylistTracksTotal] = React.useState([]);

  async function getRecommendationsFromAdvancedPayload(requestBody) {
    if (
      requestBody.seed_artists == "" &&
      requestBody.seed_genres == "" &&
      requestBody.seed_tracks == ""
    ) {
      Alert.alert(
        "You must select at least 1 artist/track/genre to generate an advanced recommendation"
      );
      return;
    }
    try {
      var songRecommendations = await getRecommendationsAdvanced(requestBody);
      songRecommendations.playlistName = "Generated Playlist #" + playlistCount;
      setPlaylistCount(playlistCount + 1);
      setPlaylists((oldArray) => [...oldArray, songRecommendations]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSongRecommendationsByTracks() {
    try {
      var jsonParams = {
        seed_artists: "",
        seed_genres: "",
        seed_tracks: topSongs,
        limit: 50,
        ...(isEnabledDance && { target_danceability: 0.8 }),
        ...(isEnabledHappy && { target_valence: 0.8 }),
        ...(isEnabledSad && { target_valence: 0.2 }),
        ...(isEnabledEnergy && { target_energy: 0.8 }),
        ...(isEnabledObscure && { target_popularity: 20 }),
      };
      //returns an array of 50 tracks
      var songRecommendations = await getRecommendationsAdvanced(jsonParams);
      songRecommendations.playlistName = "Generated Playlist #" + playlistCount;
      setPlaylistCount(playlistCount + 1);
      setPlaylists((oldArray) => [...oldArray, songRecommendations]);
    } catch (error) {
      alert(error);
    }
  }

  async function getSongRecommendationsByArtists() {
    try {
      //returns an array of 50 tracks
      var jsonParams = {
        seed_artists: "",
        seed_genres: "",
        seed_tracks: topSongs,
        limit: 50,
        ...(isEnabledDance && { target_danceability: 0.8 }),
        ...(isEnabledHappy && { target_valence: 0.8 }),
        ...(isEnabledSad && { target_valence: 0.2 }),
        ...(isEnabledEnergy && { target_energy: 0.8 }),
        ...(isEnabledObscure && { target_popularity: 20 }),
      };
      var songRecommendations = await getRecommendationsAdvanced(jsonParams);
      songRecommendations.playlistName = "Generated Playlist #" + playlistCount;
      setPlaylistCount(playlistCount + 1);
      setPlaylists((oldArray) => [...oldArray, songRecommendations]);
    } catch (error) {
      alert(error);
    }
  }

  async function fetchData() {
    try {
      const topSongsResponse = await getTopArtistsOrTracks(
        "tracks",
        "long_term",
        5
      );
      var topSongsIds = "";
      for (var i = 0; i < topSongsResponse.length; i++) {
        topSongsIds += topSongsResponse[i].id + ",";
      }
      setTopSongs(topSongsIds);
      const topArtistsResponse = await getTopArtistsOrTracks(
        "artists",
        "long_term",
        5
      );
      var topArtistsIds = "";
      for (var i = 0; i < topArtistsResponse.length; i++) {
        topArtistsIds += topArtistsResponse[i].id + ",";
      }
      setTopArtists(topArtistsIds);
    } catch (error) {
      alert(error);
    }
  }

  const handleAdvancedPayload = (advancedPayload) => {
    setAdvancedPayload(advancedPayload.queryNumValues);
  };

  React.useEffect(() => {
    if (advancedPayload != "") {
      getRecommendationsFromAdvancedPayload(advancedPayload);
    }
  }, [advancedPayload]);

  React.useEffect(() => {
    var tempPlaylistTracksTotal = [];
    for (var i = 0; i < 50; i++) {
      tempPlaylistTracksTotal.push(true);
    }
    setPlaylistTracksTotal(tempPlaylistTracksTotal);
    //fetch all data
    fetchData();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        nestedScrollEnabled={true}
        contentContainerStyle={[styles.masterView]}
      >
        <Text style={[styles.welcomeText]}>Generate Recommendations</Text>
        <View style={[styles.buffer]} />
        <Text style={[styles.bodyText]}>
          Generate a curated recommendation playlist using your top spotify
          artists or songs!
        </Text>
        <View style={{flexDirection : "row", alignItems : "center"}}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            navigation.navigate("AdvancedRecommendations");
          }}
        >
          <Text style={[styles.buttonText]}>Advanced</Text>
        </TouchableOpacity>
        <Tooltip
          isVisible={showTip}
          content={
            <View>
              <Text>
                {" "}
                Select a combination of up to 5 Artists, Tracks, or Genres to
                generate recommendations from.
              </Text>
            </View>
          }
          onClose={() => setTip(false)}
          placement="bottom"
          // below is for the status bar of react navigation bar
          topAdjustment={
            Platform.OS === "android" ? -StatusBar.currentHeight : 0
          }
        >
          <TouchableOpacity onPress={() => setTip(true)}>
            <Ionicons
              name="help-circle-outline"
              color="white"
              style={[styles.profilepic]}
              size={25}
            />
          </TouchableOpacity>
        </Tooltip>
        </View>
        <View style={[styles.rowView]}>
          <View style={[styles.rowTextView]}>
            <Text style={[styles.bodyText]}>Highly Danceable</Text>
          </View>
          <Switch
            trackColor={{ false: "121212", true: "#1DB954" }}
            ios_backgroundColor="#121212"
            onValueChange={toggleSwitchDance}
            value={isEnabledDance}
          />
        </View>
        <View style={[styles.rowView]}>
          <View style={[styles.rowTextView]}>
            <Text style={[styles.bodyText]}>Obscure</Text>
          </View>
          <Switch
            trackColor={{ false: "121212", true: "#1DB954" }}
            ios_backgroundColor="#121212"
            onValueChange={toggleSwitchObscure}
            value={isEnabledObscure}
          />
        </View>
        <View style={[styles.rowView]}>
          <View style={[styles.rowTextView]}>
            <Text style={[styles.bodyText]}>Highly Energetic</Text>
          </View>
          <Switch
            trackColor={{ false: "121212", true: "#1DB954" }}
            ios_backgroundColor="#121212"
            onValueChange={toggleSwitchEnergy}
            value={isEnabledEnergy}
          />
        </View>
        <View style={[styles.rowView]}>
          <View style={[styles.rowTextView]}>
            <Text style={[styles.bodyText]}>Very Happy</Text>
          </View>
          <Switch
            trackColor={{ false: "121212", true: "#1DB954" }}
            ios_backgroundColor="#121212"
            onValueChange={toggleSwitchHappy}
            value={isEnabledHappy}
          />
        </View>
        <View style={[styles.rowView]}>
          <View style={[styles.rowTextView]}>
            <Text style={[styles.bodyText]}>Very Sad</Text>
          </View>
          <Switch
            trackColor={{ false: "121212", true: "#1DB954" }}
            ios_backgroundColor="#121212"
            onValueChange={toggleSwitchSad}
            value={isEnabledSad}
          />
        </View>

        <View style={[styles.buffer]} />

        <View style={[styles.buttonView]}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => getSongRecommendationsByTracks()}
          >
            <Text style={[styles.buttonText]}>From Top Songs</Text>
          </TouchableOpacity>
          <View />
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => getSongRecommendationsByArtists()}
          >
            <Text style={[styles.buttonText]}>From Top Artists</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buffer]} />

        <View>
          <FlatList
            data={playlists}
            extraData={playlists}
            contentContainerStyle={[styles.flatList]}
            renderItem={(item) => {
              if (item.item.length != 0) {
                return (
                  <View style={[styles.container]}>
                    <TouchableHighlight
                      onPress={() =>
                        navigation.navigate("DisplayPlaylist", {
                          playlistSongs: item.item,
                          isUserPlaylist: false,
                        })
                      }
                    >
                      <Playlist
                        item={item}
                        playlistTracksTotal={playlistTracksTotal}
                        isUserPlaylist={false}
                      />
                    </TouchableHighlight>
                  </View>
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
