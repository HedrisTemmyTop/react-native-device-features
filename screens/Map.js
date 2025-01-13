import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleSelectLocation = function (event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };

  const handleSaveLocation = useCallback(() => {
    if (!selectedLocation) {
      return Alert.alert(
        "No location picked!",
        "You have to select a location (by tapping on the map first) first!"
      );
    }

    navigation.navigate("AddPlace", {
      selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          size={24}
          icon="save"
          color={tintColor}
          onPress={handleSaveLocation}
        />
      ),
    });
  }, [navigation, handleSaveLocation]);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
