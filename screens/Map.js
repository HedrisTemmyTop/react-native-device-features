import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleSelectLocation = function (event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };
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
