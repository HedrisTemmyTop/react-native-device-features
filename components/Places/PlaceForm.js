import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleSavePlace = function () {};
  const handleTakeImage = function (imageUri) {
    setSelectedImage(imageUri);
  };
  const handlePickLocation = useCallback((location) => {
    setSelectedLocation(location);
  }, []);
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={(enteredText) => setEnteredTitle(enteredText)}
        />
      </View>
      <ImagePicker onImageTaken={handleTakeImage} />
      <LocationPicker onPickLocation={handlePickLocation} />
      <Button onPress={handleSavePlace}>Add place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
