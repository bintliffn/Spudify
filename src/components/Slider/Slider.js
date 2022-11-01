import React from "react";
import { View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { styles } from "@src/components/Slider/SliderStyles";

function TextSlider({
  sliderText,
  step,
  minValue,
  maxValue,
  attributeName,
  handleValue,
}) {
  const [sliderValue, setSliderValue] = React.useState(50);

  function passValueUp(value) {
    console.log(value)
    let attributeValuePair = {}
    attributeValuePair[attributeName] = value[0]
    setSliderValue(value);
    handleValue(attributeValuePair);
  }

  React.useEffect(() => {
    passValueUp([(maxValue-minValue)/2]);
  }, []);
  return (
    <>
      <Text style={[styles.bodyText]}>{sliderText}</Text>
      <View style={[styles.sliderView]}>
        <Slider
          value={sliderValue}
          onValueChange={(value) => passValueUp(value)}
          maximumValue={maxValue}
          minimumValue={minValue}
          minimumTrackTintColor={"#1DB954"}
          maximumTrackTintColor={"#FFFFFF"}
          thumbTintColor={"#B3B3B3"}
          step={step}
        />
      </View>
      <Text style={[styles.bodyText]}>{sliderValue}</Text>
    </>
  );
}

export default TextSlider;
