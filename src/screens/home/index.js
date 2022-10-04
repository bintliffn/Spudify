import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import {
  getUserInfo,
  getTopArtistsOrTracks,
  getRecentlyPlayed,
  getCurrentSongPlaying,
} from "@src/utils/Queries";
import { getStatisticsFromTopSongs } from "@src/utils/statistics";
import React from "react";
import { styles } from "@src/screens/home/homeStyles";
import Song from "@src/components/DisplaySong/Song";
import Artist from "@src/components/DisplayArtist/Artist";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  //Variable to determine whether to display dahsboard or not
  const [display, setDisplay] = React.useState(false);
  //Variable to determine whether a song is currently playing on users account or not
  const [isPlaying, setIsPlaying] = React.useState(false);
  //Variable to determine whether to display statistics or not
  const [showStatistics, setShowStatistics] = React.useState(false);

  //Stores keyword to display and values for various statistics regarding users top songs
  const [danceabilityKeyword, setDanceabilityKeyword] = React.useState();
  const [danceabilityValue, setDanceabilityValue] = React.useState();
  const [popularityKeyword, setpopularityKeyword] = React.useState();
  const [popularityValue, setpopularityValue] = React.useState();
  const [valenceKeyword, setValenceKeyword] = React.useState();
  const [valenceValue, setValenceValue] = React.useState();
  const [energyKeyword, setEnergyKeyword] = React.useState();
  const [energyValue, setEnergyValue] = React.useState();

  //Store current song playing on users account
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState();
  //Store username associated with users account
  const [username, setUsername] = React.useState();
  //Store users top song
  const [topSong, setTopSong] = React.useState();
  //Store users top artist
  const [topArtist, setTopArtist] = React.useState();
  //Store users recently played tracks
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = React.useState();
  //Store text to display if dashboard is loading/user does not have enough play history to display dashboard
  const [displayText, setDisplayText] = React.useState("Loading...");
  //Store attributes of users top songs found from statistics method
  var attributes;

  //Function to get the keyword to display for a statistical attribute based on it's numerical value
  //Takes in 5 keywords and the value of the attribute
  function getKeyword(
    lowKeyword,
    midLowKeyword,
    midKeyword,
    midHighKeyword,
    highKeyword,
    value
  ) {
    if (value <= 0.2) {
      return lowKeyword;
    } else if (value > 0.2 && value <= 0.4) {
      return midLowKeyword;
    } else if (value > 0.4 && value <= 0.6) {
      return midKeyword;
    } else if (value > 0.6 && value <= 0.8) {
      return midHighKeyword;
    } else {
      return highKeyword;
    }
  }

  //Sets the keywords to be displayed on the dashboard using the getKeyword function
  function setKeywords() {
    var keyword = getKeyword(
      "Non-Rhythmic",
      "Lacking rhythym",
      "Semi-Danceable",
      "Danceable",
      "Extremely-Danceable",
      attributes.danceability
    );
    setDanceabilityKeyword(keyword);
    setDanceabilityValue(attributes.danceability);
    keyword = getKeyword(
      "Obscure",
      "Off the beaten path",
      "Niche",
      "Mainstream",
      "Smash-Hits",
      attributes.popularity / 100
    );
    setpopularityKeyword(keyword);
    setpopularityValue(attributes.popularity);
    keyword = getKeyword(
      "Sorrowful",
      "Sad",
      "Mixed between happy and sad",
      "Happy",
      "Cheerful",
      attributes.valence
    );
    setValenceKeyword(keyword);
    setValenceValue(attributes.valence);
    keyword = getKeyword(
      "Lethargic",
      "Laid-Back",
      "Semi-Energetic",
      "Lively",
      "Full of energy",
      attributes.energy
    );
    setEnergyKeyword(keyword);
    setEnergyValue(attributes.energy);
    setShowStatistics(true);
  }

  //Fetches data to be displayed on the dashboard
  //Takes in dataToFetch paramter which tells the function which data it needs to fetch
  async function fetchData(dataToFetch) {
    //If function is called from initial useState function
    if (dataToFetch == 1) {
      //Retrieve information about current user
      const userInfo = await getUserInfo();
      //Set current user's username
      setUsername(userInfo.display_name);
      //Retrieve up to top 50 tracks from user
      const topSongsResponse = await getTopArtistsOrTracks(
        "tracks",
        "long_term",
        50
      );
      //if user has listened to less than 5 songs total
      if (topSongsResponse.length < 5) {
        //Don't display dashboard and instruct the user to listen to more music
        setDisplayText(
          "Please listen to at least 5 songs to have the dashboard displayed"
        );
        return;
      } else {
        //otherwise set the users top song to the variable topSong
        setTopSong(topSongsResponse[0]);
      }
      //Same as above but with top artists
      const topArtistsResponse = await getTopArtistsOrTracks(
        "artists",
        "long_term",
        50
      );
      setTopArtist(topArtistsResponse[0]);
      //Get the users recently played tracks
      const recentlyPlayedTracksResponse = await getRecentlyPlayed();
      //Assign them to the recently played tracks variable
      setRecentlyPlayedTracks(recentlyPlayedTracksResponse);
      //Display initial Dashboard (This allows user to view info while statistics query is called which takes a while)
      setDisplay(true);
      //Get statistics from users top songs
      const statisticsResponse = await getStatisticsFromTopSongs(
        topSongsResponse
      );
      //Assign attributes to statistics response
      attributes = statisticsResponse;
      //Call setKeywords function to set keywords to display on dashboard
      setKeywords();
    }
    const recentlyPlayedTracksResponse = await getRecentlyPlayed();
    //Assign them to the recently played tracks variable
    setRecentlyPlayedTracks(recentlyPlayedTracksResponse);
    //Get the current song playing
    var currentSongPlayingResponse = await getCurrentSongPlaying();
    //If there is actually a song playing
    if (currentSongPlayingResponse != "") {
      //Assign it to the variable currentSongPlaying
      setCurrentSongPlaying(currentSongPlayingResponse.item);
      //Set is playing to true which will re render the dashboard with the current song playing
      setIsPlaying(true);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      //only fetch recently and currently played data
      fetchData(0);
    }, [])
  );

  React.useEffect(() => {
    //fetch all data
    fetchData(1);
  }, []);

  return (
    <SafeAreaView style={[styles.masterView]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
      >
        {display ? (
          <View>
            <View style={[styles.welcomeView]}>
              <Text style={[styles.welcomeText]}>Welcome {username}!</Text>
            </View>
            <View style={[styles.buffer]} />
            <Text style={[styles.topItemText]}>Current Song Playing</Text>
            <View style={[styles.songOrArtistView]}>
              {isPlaying ? (
                <Song SingleJsonSong={currentSongPlaying} />
              ) : (
                <Text style={[styles.noContentText]}>
                  {" "}
                  No Song Currently Playing
                </Text>
              )}
            </View>
            <View style={[styles.buffer]} />
            <Text style={[styles.topItemText]}>Your Top Song</Text>
            <View style={[styles.songOrArtistView]}>
              <Song SingleJsonSong={topSong} />
            </View>
            <View style={[styles.buffer]} />
            <Text style={[styles.topItemText]}>Your Top Artist</Text>
            <View style={[styles.songOrArtistView]}>
              <Artist SingleJsonArtist={topArtist} />
            </View>
            <View style={[styles.buffer]} />
            <Text style={[styles.topItemText]}>Recently Played Tracks</Text>
            <Song SingleJsonSong={recentlyPlayedTracks[0].track} />
            <Song SingleJsonSong={recentlyPlayedTracks[1].track} />
            <Song SingleJsonSong={recentlyPlayedTracks[2].track} />
            <Song SingleJsonSong={recentlyPlayedTracks[3].track} />
            <Song SingleJsonSong={recentlyPlayedTracks[4].track} />
            <View style={[styles.buffer]} />
            {showStatistics ? (
              <>
                <Text style={[styles.topItemText]}>Your top tracks are...</Text>

                <View style={[styles.statsView]}>
                  <Text style={[styles.topItemText]}>
                    <Text style={[styles.highlightedWord]}>
                      {danceabilityKeyword}{" "}
                    </Text>
                    with an average dancability of{" "}
                    <Text style={[styles.highlightedWord]}>
                      {" "}
                      {danceabilityValue.toFixed(2) * 100}%{" "}
                    </Text>
                  </Text>
                </View>

                <View style={[styles.statsView]}>
                  <Text style={[styles.topItemText]}>
                    <Text style={[styles.highlightedWord]}>
                      {popularityKeyword}{" "}
                    </Text>
                    with an average popularity of{" "}
                    <Text style={[styles.highlightedWord]}>
                      {" "}
                      {popularityValue}%{" "}
                    </Text>
                  </Text>
                </View>
                <View style={[styles.statsView]}>
                  <Text style={[styles.topItemText]}>
                    <Text style={[styles.highlightedWord]}>
                      {valenceKeyword}{" "}
                    </Text>
                    with an average valence of{" "}
                    <Text style={[styles.highlightedWord]}>
                      {" "}
                      {valenceValue.toFixed(2) * 100}%{" "}
                    </Text>
                  </Text>
                </View>
                <View style={[styles.statsView]}>
                  <Text style={[styles.topItemText]}>
                    <Text style={[styles.highlightedWord]}>
                      {energyKeyword}{" "}
                    </Text>
                    with an average energy of{" "}
                    <Text style={[styles.highlightedWord]}>
                      {" "}
                      {energyValue.toFixed(2) * 100}%{" "}
                    </Text>
                  </Text>
                </View>
              </>
            ) : (
              <Text style={[styles.noContentText]}> Loading Statistics...</Text>
            )}
          </View>
        ) : (
          <Text style={[styles.noContentText]}>{displayText}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
