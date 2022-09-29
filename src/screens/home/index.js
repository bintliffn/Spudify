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

  const [currentSongPlaying, setCurrentSongPlaying] = React.useState();
  const [username, setUsername] = React.useState();
  const [topSong, setTopSong] = React.useState();
  const [topArtist, setTopArtist] = React.useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = React.useState();
  
  var attributes;
  var danceabilityKeyword, popularityKeyword, valenceKeyword, energyKeyword;

  function getKeyword(lowKeyword,midKeyword,highKeyword, value){
    if(value <= .33){
      return lowKeyword;
    }else if(value >.33 && value <= .66){
      return midKeyword;
    }else{
      return highKeyword;
    }
  }

  function setKeywords(){
    danceabilityKeyword = getKeyword("non-rhythmic","semi-danceable","highly-danceable",attributes.danceability);
    popularityKeyword = getKeyword("obscure","niche","mainstream", (attributes.popularity)/100);
    valenceKeyword = getKeyword("sad","mixed between happy and sad","happy", attributes.valence);
    energyKeyword = getKeyword("laid-back","semi-energetic","fully of energy",attributes.energy)
    console.log(energyKeyword);
  }

  //divide this into different functions for each api call we want to make?
  //displa items as they are rendered not all at once (slow loading times)
  async function fetchData(dataToFetch) {
    if(dataToFetch == 1){
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
    setTopArtist (topArtistsResponse[0]);
    //getStatisticsFromTopSongs(topSongsResponse);
    const recentlyPlayedTracksResponse = await getRecentlyPlayed();
    setRecentlyPlayedTracks(recentlyPlayedTracksResponse);
    setDisplay(true);
    const statisticsResponse = await getStatisticsFromTopSongs(topSongsResponse);
    attributes = statisticsResponse;
    setKeywords();
    }
    var currentSongPlayingResponse = await getCurrentSongPlaying();
    if(currentSongPlayingResponse != ""){
      setCurrentSongPlaying(currentSongPlayingResponse.item);
      setIsPlaying(true)
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
              <Song SingleJsonSong={currentSongPlaying} />) : 
              (
                <Text style={[styles.noContentText]}> No Song Currently Playing</Text>
              )
              }
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
          </View>
        ) : (
          <Text style={[styles.renderingText]}>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
