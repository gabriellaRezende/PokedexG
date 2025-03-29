import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";


export default function PokedexScreen() {
    const navigation = useNavigation();

  return (
    <View>
      <Text>Tela Pokédex</Text>
      <Button title="Ver detalhes" onPress={() => navigation.navigate("PokemonDetail")} />
    </View>
  );
}
