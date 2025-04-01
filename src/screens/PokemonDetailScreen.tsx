import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PokemonDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Detalhes do Pokemon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393D43",
  },
  text: {
    color: "#fff",
  },
});