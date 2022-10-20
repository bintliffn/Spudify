import * as React from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView, LogBox } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "@src/screens/songs/utils";
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
  // useStates for top songs dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("short_term");
  const [items, setItems] = React.useState(dropdownItems);
  const [artistsOpen, setArtistsOpen] = React.useState(false);
  const [artistsValue, setArtistsValue] = React.useState("short_term");

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
  async function fetchData(artistsOrTracks, time_range) {
    const data = await getTopArtistsOrTracks(artistsOrTracks, time_range, 5);
    if (artistsOrTracks === "tracks") {
      setTopSongs(data);
      setTopSongsLoaded(true);
    } else {
      setTopArtists(data);
      setTopArtistsLoaded(true);
    }
  }

  React.useEffect(() => {
    // Calls async function to get data from the Spotify API for user's top songs
    fetchData("tracks", value);
  }, [value]);

  React.useEffect(() => {
    // Calls async function to get data from the Spotify API for user's top artists
    fetchData("artists", artistsValue);
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
      >
        <View style={[styles.parentView]}>
          <View style={[styles.view]}>
            <Text style={[styles.titleText]}>Top Songs</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
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
                  renderItem={(item) => {
                    return <Song SingleJsonSong={item.item} />;
                  }}
                />
              </View>
            ) : null }
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
                  renderItem={(item) => {
                    return <Artist SingleJsonArtist={item.item} />;
                  }}
                />
              </View>
            ) : null }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
