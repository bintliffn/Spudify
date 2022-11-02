import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "@src/components/SearchBar/SearchBarStyles";
import { searchForItems } from "@src/utils/Queries";
import Song from "@src/components/DisplaySong/Song";
import Artist from "@src/components/DisplayArtist/Artist";

function SearchBar({ queryType }) {
  const [results, setResults] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedTracks, setSelectedTracks] = React.useState("");
  const [selectedArtists, setSelectedArtists] = React.useState("");
  const [selectedGenres, setSelectedGenres] = React.useState("");

  const [searchQuery, setSearchQuery] = React.useState("");
  const [displaySongs, setDisplaySongs] = React.useState(true);

  const dropdownItems = [
    { label: "Tracks", value: "track" },
    { label: "Artists", value: "artist" },
    { label: "Genres", value: "genre" },
  ];

  // useStates for dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("track");
  const [items, setItems] = React.useState(dropdownItems);

  async function search(query) {
    var itemsReturned = await searchForItems(value, query);
    if (value == "track") {
      setResults(itemsReturned.tracks.items);
    } else if (value == "artist") {
      setResults(itemsReturned.artists.items);
    } else {
      setResults(itemsReturned.genres.items);
    }
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  //for testing
  React.useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  //for testing
  React.useEffect(() => {
    console.log(selectedTracks);
  }, [selectedTracks]);

  React.useEffect(() => {
    setResults([]);
  }, [value]);

  React.useEffect(() => {
    if (value == "track") {
      setDisplaySongs(true);
    } else {
      setDisplaySongs(false);
    }
  }, [results]);

  React.useEffect(() => {
    if(selectedItems.length == 0){
        return;
    }
    if (value == "track") {
      setSelectedTracks(
        selectedTracks + selectedItems[selectedItems.length - 1] + ","
      );
    } else if (value == "artist") {
      setSelectedArtists(
        selectedArtists + selectedItems[selectedItems.length - 1] + ","
      );
    } else {
      setSelectedTracks(
        selectedGenres + selectedItems[selectedItems.length - 1] + ","
      );
    }
  }, [selectedItems]);

  return (
    <SafeAreaView style={[styles.masterView]}>
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
      <Searchbar
        placeholder={"Search for a " + value}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={[styles.buffer]} />
      <TouchableHighlight
        onPress={() => {
          search(searchQuery);
          Alert.alert("Searching for " + value);
        }}
        style={[styles.addplaylistButton]}
      >
        <Text style={[styles.buttonText]}>Search for {value}</Text>
      </TouchableHighlight>
      <View style={[styles.buffer]} />
      <FlatList
        data={results}
        extraData={results}
        contentContainerStyle={[styles.flatList]}
        renderItem={(item) => {
          return (
            <View style={[styles.container]}>
              <TouchableHighlight
                onPress={() => {
                  if (selectedItems.length < 5) {
                    setSelectedItems([...selectedItems, item.item.id]);
                    Alert.alert("Added item to search");
                  } else {
                    Alert.alert("Cannot have more than 5 items in a search");
                  }
                }}
              >
                {displaySongs == true ? (
                  <Song SingleJsonSong={item.item} />
                ) : (
                  <Artist SingleJsonArtist={item.item} />
                )}
              </TouchableHighlight>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
export default SearchBar;
