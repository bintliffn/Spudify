import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
import { Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "@src/screens/Songs/songStyles";
import Song from "@src/components/DisplaySong/Song";
import { getTopArtistsOrTracks } from "@src/utils/Queries";
import Artist from "@src/components/DisplayArtist/Artist";

// Options for the 2 dropdown selectors for time range
const dropdownItems = [
  { label: "Last Month", value: "short_term" },
  { label: "Last 6 Months", value: "medium_term" },
  { label: "All Time", value: "long_term" },
];

export default function Songs({ navigation }) {
  // useStates for top songs and artists dropdowns
  const [songsOpen, setSongsOpen] = React.useState(false);
  const [songsValue, setSongsValue] = React.useState("short_term");
  const [items, setItems] = React.useState(dropdownItems);
  const [artistsOpen, setArtistsOpen] = React.useState(false);
  const [artistsValue, setArtistsValue] = React.useState("short_term");

  // useStates for how many songs and artists to display
  const [songsQuantity, setSongsQuantity] = React.useState(5);
  const [artistsQuantity, setArtistsQuantity] = React.useState(5);

  // useStates to hold the top songs/artists data and for ensuring data is loaded
  const [topArtists, setTopArtists] = React.useState();
  const [topArtistsLoaded, setTopArtistsLoaded] = React.useState(false);
  const [topSongs, setTopSongs] = React.useState();
  const [topSongsLoaded, setTopSongsLoaded] = React.useState(false);

  /**
   * @param {String} artistsOrTracks either "artists" or "tracks"
   * @param {String} time_range short_term, medium_term, or long_term
   * @returns doesn't return anything, sets the state of topSongs/topArtists
   * to the data returned from the query
   */
  async function fetchData(artistsOrTracks, time_range, quantity) {
    const data = await getTopArtistsOrTracks(
      artistsOrTracks,
      time_range,
      quantity
    );
    if (artistsOrTracks === "tracks") {
      setTopSongs(data);
      setTopSongsLoaded(true);
    } else {
      setTopArtists(data);
      setTopArtistsLoaded(true);
    }
  }

  const loadMoreSongs = () => {
    if (songsQuantity <= 45) {
      setSongsQuantity(songsQuantity + 5);
    }
  };

  const loadMoreArtists = () => {
    if (artistsQuantity <= 45) {
      setArtistsQuantity(artistsQuantity + 5);
    }
  };

  React.useEffect(() => {
    // Calls async function to get data from the Spotify API for user's top songs
    fetchData("tracks", songsValue, songsQuantity);
  }, [songsValue, songsQuantity]);

  React.useEffect(() => {
    // Calls async function to get data from the Spotify API for user's top artists
    fetchData("artists", artistsValue, artistsQuantity);
  }, [artistsValue, artistsQuantity]);

  // Ignores the virtualized lists error with scroll view and flatlist
  // TODO: fix the error vetween scrollview and flatlist
  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView style={[styles.view]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={[styles.parentView]}>
          <View style={[styles.view]}>
            <Text style={[styles.titleText]}>Top Songs</Text>
            <DropDownPicker
              open={songsOpen}
              value={songsValue}
              items={items}
              setOpen={setSongsOpen}
              setValue={setSongsValue}
              setItems={setItems}
              style={[styles.selectDropdown]}
              dropDownContainerStyle={[styles.dropdownContainer]}
              textStyle={[styles.dropdownText]}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>
          <View style={[styles.dataView]}>
            {topSongsLoaded ? (
              <View style={[styles.songOrArtistView]}>
                <FlatList
                  data={topSongs}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item) => {
                    return <Song SingleJsonSong={item.item} />;
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={[styles.buttonView]}>
            <Button style={[styles.button]} onPress={loadMoreSongs} mode={"outlined"}>
              Load More +
            </Button>
            {songsQuantity > 5 ? (
              <Button
                style={[styles.button]}
                onPress={() => setSongsQuantity(5)}
              >
                Show Less
              </Button>
            ) : null}
          </View>
          <View style={[styles.view]}>
            <Text style={[styles.titleText]}>Top Artists</Text>
            <DropDownPicker
              open={artistsOpen}
              value={artistsValue}
              items={items}
              setOpen={setArtistsOpen}
              setValue={setArtistsValue}
              setItems={setItems}
              style={[styles.selectDropdown]}
              dropDownContainerStyle={[styles.dropdownContainer]}
              textStyle={[styles.dropdownText]}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>
          <View style={[styles.dataView]}>
            {topArtistsLoaded ? (
              <View style={[styles.songOrArtistView]}>
                <FlatList
                  data={topArtists}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item) => {
                    return <Artist SingleJsonArtist={item.item} />;
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={[styles.buttonView]}>
            <Button style={[styles.button]} onPress={loadMoreArtists}>
              Load More +
            </Button>
            {artistsQuantity > 5 ? (
              <Button
                style={[styles.button]}
                onPress={() => setArtistsQuantity(5)}
              >
                Show Less
              </Button>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
