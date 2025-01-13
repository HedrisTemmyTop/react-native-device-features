import { Text, StyleSheet, View, Pressable } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = function ({ color, size, onPress, icon }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons color={color} size={size} name={icon} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,

    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
