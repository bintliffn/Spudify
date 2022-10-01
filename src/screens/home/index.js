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
  const [display, setDisplay] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showStatistics, setShowStatistics] = React.useState(false);

  const [danceabilityKeyword, setDanceabilityKeyword] = React.useState();
  const [danceabilityValue, setDanceabilityValue] = React.useState();
  const [popularityKeyword, setpopularityKeyword] = React.useState();
  const [popularityValue, setpopularityValue] = React.useState();
  const [valenceKeyword, setValenceKeyword] = React.useState();
  const [valenceValue, setValenceValue] = React.useState();
  const [energyKeyword, setEnergyKeyword] = React.useState();
  const [energyValue, setEnergyValue] = React.useState();

  const [currentSongPlaying, setCurrentSongPlaying] = React.useState();
  const [username, setUsername] = React.useState();
  const [topSong, setTopSong] = React.useState();
  const [topArtist, setTopArtist] = React.useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = React.useState();

  var attributes;

  function getKeyword(lowKeyword,midLowKeyword, midKeyword, midHighKeyword, highKeyword, value) {
    if (value <= 0.20) {
      return lowKeyword;
    } else if (value > 0.20 && value <= 0.40) {
      return midLowKeyword;
    } else if(value > .40 && value <=.60) {
      return midKeyword;
    }else if(value > .60 && value <=.80){
      return midHighKeyword;
    }else{
      return highKeyword;
    }
  }

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

  //divide this into different functions for each api call we want to make?
  //displa items as they are rendered not all at once (slow loading times)
  async function fetchData(dataToFetch) {
    if (dataToFetch == 1) {
      const userInfo = await getUserInfo();
      setUsername(userInfo.display_name);
      //need to have error handling here incase they do not have top 10 songs (so app wont crash)
      const topSongsResponse = await getTopArtistsOrTracks(
        "tracks",
        "long_term",
        50
      );
      setTopSong(topSongsResponse[0]);
      const topArtistsResponse = await getTopArtistsOrTracks(
        "artists",
        "long_term",
        50
      );
      setTopArtist(topArtistsResponse[0]);
      //getStatisticsFromTopSongs(topSongsResponse);
      const recentlyPlayedTracksResponse = await getRecentlyPlayed();
      setRecentlyPlayedTracks(recentlyPlayedTracksResponse);
      setDisplay(true);
      const statisticsResponse = await getStatisticsFromTopSongs(
        topSongsResponse
      );
      attributes = statisticsResponse;
      setKeywords();
    }
    var currentSongPlayingResponse = await getCurrentSongPlaying();
    if (currentSongPlayingResponse != "") {
      setCurrentSongPlaying(currentSongPlayingResponse.item);
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
          <Text style={[styles.noContentText]}>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
