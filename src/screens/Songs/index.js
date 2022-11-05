import * as React from "react";
import { View, SafeAreaView, ScrollView, LogBox } from "react-native";
import { styles } from "@src/screens/Songs/songStyles";
import { getTopArtistsOrTracks } from "@src/utils/Queries";
import Top from "@src/components/DisplayTop/Top";

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

  // Calls async function to get data from the Spotify API for user's top songs on page load and when the time frame changes
  React.useEffect(() => {
    fetchData("tracks", songsValue, 50);
  }, [songsValue]);

  // Calls async function to get data from the Spotify API for user's top artists on page load and when the time frame changes
  React.useEffect(() => {
    fetchData("artists", artistsValue, 50);
  }, [artistsValue]);

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
        contentContainerStyle={[styles.scrollView]}
      >
        <View style={[styles.parentView]}>
          <Top
            title={"Top Songs"}
            type={"songs"}
            open={songsOpen}
            value={songsValue}
            items={items}
            setOpen={setSongsOpen}
            setValue={setSongsValue}
            setItems={setItems}
            loaded={topSongsLoaded}
            data={topSongs}
            loadMore={loadMoreSongs}
            quantity={songsQuantity}
            setQuantity={setSongsQuantity}
          ></Top>
          <Top
            title={"Top Artists"}
            type={"artists"}
            open={artistsOpen}
            value={artistsValue}
            items={items}
            setOpen={setArtistsOpen}
            setValue={setArtistsValue}
            setItems={setItems}
            loaded={topArtistsLoaded}
            data={topArtists}
            loadMore={loadMoreArtists}
            quantity={artistsQuantity}
            setQuantity={setArtistsQuantity}
          ></Top>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
