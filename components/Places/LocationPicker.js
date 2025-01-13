import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const LocationPicker = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const verifyPermission = async function () {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const locationResponse = await requestPermission();

      return locationResponse.granted;
    }
    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Required",
        "You need to grant this app permission to know your location",
        [
          {
            style: "destructive",
          },
        ]
      );

      return false;
    }

    return true;
  };
  const handleGetLocation = async function () {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    const location = await getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    setLocation({
      latitude,
      longitude,
    });
    console.log(location);
  };
  const handlePickOnMap = function () {
    console.log("navigate");
    navigation.navigate("Map");
  };

  return (
    <View>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={location}
            title="My Location"
            description="This is a marker description"
          />
        </MapView>
      )}
      {!location && <View style={styles.mapPreview}></View>}
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={handleGetLocation}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={handlePickOnMap}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
