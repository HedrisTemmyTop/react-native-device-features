import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onImageTaken }) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  const verifyPermission = async function () {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use this app"
      );

      return false;
    }

    return true;
  };
  const handleTakeImage = async function () {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImageUri(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  };
  return (
    <View>
      <View style={styles.imagePreview}>
        {!imageUri && <Text>No image taken yet</Text>}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <OutlinedButton onPress={handleTakeImage} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
});
