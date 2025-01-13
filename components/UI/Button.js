import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const Button = ({ onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 4,
  },

  pressed: {
    opacity: 0.7,
  },
  text: { textAlign: "center", fontSize: 18, color: Colors.primary50 },
});
