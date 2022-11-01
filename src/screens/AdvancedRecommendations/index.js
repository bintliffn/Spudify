import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import TextSlider from "@src/components/Slider/Slider";
import { styles } from "@src/screens/AdvancedRecommendations/advancedRecommendationsStyles";

export default function Home({ navigation }) {
  const [display, setDisplay] = React.useState(false);
  const [queryNumValues, setQueryNumValues] = React.useState({});

  handleAttributeValue = (attributePlusValue) => {
    setQueryNumValues((queryNumValues) => ({
      ...queryNumValues,
      ...attributePlusValue,
    }));
  };

  React.useEffect(() => {
    setDisplay(true);
  }, []);

  React.useEffect(() => {
    console.log(queryNumValues);
  }, [queryNumValues]);

  return (
    <SafeAreaView style={[styles.masterView]}>
      <ScrollView>
        {display ? (
          <>
            <TextSlider
              sliderText={"Target Danceability"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_danceability"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Energy"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_energy"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Acousticness"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_acousticness"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Loudness"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_loudness"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Liveness"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_liveness"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Happiness"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_happiness"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Popularity"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_popularity"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Instrumentalness"}
              step={1}
              minValue={0}
              maxValue={100}
              attributeName={"target_instrumentalness"}
              handleValue={handleAttributeValue}
            />
            <TextSlider
              sliderText={"Target Duration (seconds)"}
              step={1}
              minValue={0}
              maxValue={1800}
              attributeName={"target_duration"}
              handleValue={handleAttributeValue}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}