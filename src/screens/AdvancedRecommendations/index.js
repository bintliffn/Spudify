import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import TextSlider from "@src/components/Slider/Slider";
import { styles } from "@src/screens/AdvancedRecommendations/advancedRecommendationsStyles";
import SearchBar from "@src/components/SearchBar/SearchBar";
import { getRecommendationsAdvanced } from "@src/utils/Queries";
import { DeviceEventEmitter } from "react-native";

export default function Home({ navigation }) {
  const [display, setDisplay] = React.useState(false);
  const [queryNumValues, setQueryNumValues] = React.useState({});

  const handleAttributeValue = (attributePlusValue) => {
    if ("target_duration_ms" in attributePlusValue) {
      attributePlusValue.target_duration_ms =
        attributePlusValue.target_duration_ms * 1000;
    }
    setQueryNumValues((queryNumValues) => ({
      ...queryNumValues,
      ...attributePlusValue,
    }));
  };

  const handleSeedValue = (seedPlusValue) => {
    setQueryNumValues((queryNumValues) => ({
      ...queryNumValues,
      ...seedPlusValue,
    }));
  };

  React.useEffect(() => {
    setDisplay(true);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {display ? (
          <>
            <View style={[styles.searchBarView]}>
              <SearchBar handleValue={handleSeedValue} />
            </View>
            <View style={[styles.masterView]}>
              <TextSlider
                sliderText={"Danceability"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_danceability"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Energy"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_energy"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Acousticness"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_acousticness"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Loudness"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_loudness"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Liveness"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_liveness"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Happiness"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_happiness"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Popularity"}
                step={1}
                minValue={0}
                maxValue={100}
                attributeName={"target_popularity"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Instrumentalness"}
                step={0.01}
                minValue={0.0}
                maxValue={1.0}
                attributeName={"target_instrumentalness"}
                handleValue={handleAttributeValue}
              />
              <TextSlider
                sliderText={"Duration (seconds)"}
                step={1}
                minValue={0}
                maxValue={1800}
                attributeName={"target_duration_ms"}
                handleValue={handleAttributeValue}
              />
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  DeviceEventEmitter.emit("event.advancedPayload", {
                    queryNumValues,
                  });
                  navigation.goBack();
                }}
              >
                <Text style={[styles.buttonText]}>
                  Generate advanced recommendations
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
