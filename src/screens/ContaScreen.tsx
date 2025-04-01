import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContaScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela Conta</Text>
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
