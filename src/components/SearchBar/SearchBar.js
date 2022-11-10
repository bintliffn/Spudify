import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Tooltip from "react-native-walkthrough-tooltip";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "@src/components/SearchBar/SearchBarStyles";
import { searchForItems, getGenres } from "@src/utils/Queries";
import Song from "@src/components/DisplaySong/Song";
import Artist from "@src/components/DisplayArtist/Artist";

function SearchBar({ handleValue }) {
  //Array that stores results from search query
  const [results, setResults] = React.useState([]);
  //Array that stores available genres
  const [genres, setGenres] = React.useState([]);
  //Array that stores all selected items (max of 5)
  const [selectedItems, setSelectedItems] = React.useState([]);
  //comma seperated list of respective tracks, artists, or genres
  const [selectedTracks, setSelectedTracks] = React.useState("");
  const [selectedArtists, setSelectedArtists] = React.useState("");
  const [selectedGenres, setSelectedGenres] = React.useState("");

  //String that stores the search query inputted by the user
  const [searchQuery, setSearchQuery] = React.useState("");
  //Boolean value to decide whether to render songs or artists in the flatlist
  const [displayItemType, setDisplayItemType] = React.useState("track");

  //options displayed in the dropdown picker
  const dropdownItems = [
    { label: "Tracks", value: "track" },
    { label: "Artists", value: "artist" },
    { label: "Genres", value: "genre" },
  ];

  // useStates for dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("track");
  const [items, setItems] = React.useState(dropdownItems);

  const [showTip, setTip] = React.useState(false);

  //function to search for something using spotifys API
  async function search(query) {
    console.log("Here");
    var itemsReturned = await searchForItems(value, query);
    if (value == "track") {
      setResults(itemsReturned.tracks.items);
    } else if (value == "artist") {
      setResults(itemsReturned.artists.items);
    }
  }

  //function to retreive genres
  async function retrieveGenres() {
    var genresResponse = await getGenres();
    setGenres(genresResponse.genres);
  }

  function passValueUp(seedName, value) {
    let attributeValuePair = {};
    attributeValuePair[seedName] = value;
    handleValue(attributeValuePair);
  }

  //function to update query when user input changes
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  //use effect that gets genres when page is first loaded
  React.useEffect(() => {
    retrieveGenres();
  }, []);

  //use effect that resets the flatlist when the dropdown value changes
  React.useEffect(() => {
    setResults([]);
  }, [value]);

  //use effect that toggles whether the flatlist displays songs or artists when the results array resets
  React.useEffect(() => {
    if (value == "track") {
      setDisplayItemType("track");
    } else if (value == "artist") {
      setDisplayItemType("artist");
    } else {
      setResults(genres);
      setDisplayItemType("genre");
    }
  }, [results]);

  // use effect that adds values to the respective string when an item is added to the selectedItems array
  React.useEffect(() => {
    if (selectedItems.length == 0) {
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
      setSelectedGenres(
        selectedGenres + selectedItems[selectedItems.length - 1] + ","
      );
    }
  }, [selectedItems]);

  React.useEffect(() => {
    passValueUp("seed_tracks", selectedTracks);
  }, [selectedTracks]);

  React.useEffect(() => {
    passValueUp("seed_artists", selectedArtists);
  }, [selectedArtists]);

  React.useEffect(() => {
    passValueUp("seed_genres", selectedGenres);
  }, [selectedGenres]);

  return (
    <SafeAreaView style={[styles.masterView]}>
      {displayItemType == "genre" ? (
        <>
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
          <View style={[styles.buffer]} />
        </>
      ) : (
        <>
          <View style={[styles.rowView]}>
            <Searchbar
              placeholder={"Search for a " + value}
              onChangeText={onChangeSearch}
              onSubmitEditing={(event) => search(event.nativeEvent.text)}
              value={searchQuery}
              style={[styles.searchBar]}
              inputStyle={[styles.dropdownText]}
              iconColor="#1DB954"
            />
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
          <View style={[styles.buffer]} />
        </>
      )}


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
                  if (selectedItems.length < 5 && displayItemType != "genre") {
                    setSelectedItems([...selectedItems, item.item.id]);
                    Alert.alert("Added item to search");
                  } else if (
                    selectedItems.length < 5 &&
                    displayItemType == "genre"
                  ) {
                    setSelectedItems([...selectedItems, item.item]);
                    Alert.alert("Added item to search");
                  } else {
                    Alert.alert("Cannot have more than 5 items in a search");
                  }
                }}
              >
                {displayItemType == "track" ? (
                  <Song SingleJsonSong={item.item} />
                ) : (
                  <>
                    {displayItemType == "artist" ? (
                      <Artist SingleJsonArtist={item.item} />
                    ) : (
                      <Text style={styles.bodyText}> {item.item} </Text>
                    )}
                  </>
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
