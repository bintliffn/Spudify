import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "@src/components/DisplayTop/TopStyles";
import Song from "@src/components/DisplaySong/Song";
import Artist from "@src/components/DisplayArtist/Artist";

// Background color for the show more/less buttons
const btnColor = "#191414";

export default function Top({
  title,
  type,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  loaded,
  data,
  loadMore,
  quantity,
  setQuantity,
}) {
  return (
    <View>
      <View style={[styles.view]}>
        <Text style={[styles.titleText]}>{title}</Text>
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
        {loaded ? (
          <View style={[styles.songOrArtistView]}>
            <FlatList
              data={data.slice(0, quantity)}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => {
                if (type === "songs") {
                  return <Song SingleJsonSong={item.item} />;
                } else {
                  return <Artist SingleJsonArtist={item.item} />;
                }
              }}
            />
          </View>
        ) : null}
      </View>
      <View style={[styles.buttonView]}>
        <Button
          labelStyle={[styles.buttonText]}
          color={btnColor}
          compact={true}
          mode={"text"}
          onPress={loadMore}
        >
          Load More
        </Button>
        {quantity > 5 ? (
          <Button
            labelStyle={[styles.buttonText]}
            color={btnColor}
            compact={true}
            mode={"text"}
            onPress={() => setQuantity(5)}
          >
            Show Less
          </Button>
        ) : null}
      </View>
    </View>
  );
}
