import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Chip = (props) => {
  return (
    <View
      style={[{ height: props.height, width: props.width }, styles.roundedChip]}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  roundedChip: {
    marginBottom: "4%",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chip;
