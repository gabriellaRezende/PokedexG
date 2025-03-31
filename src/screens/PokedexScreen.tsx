import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { ParamList } from "../navegation/navegation"; // Importando o tipo ParamList


export default function PokedexScreen() {
    const navigation = useNavigation<NavigationProp<ParamList>>(); // Usando o tipo ParamList para tipar a navegação

  return (
    <View>
      <Text>Tela Pokédex</Text>
      <Button title="Ver detalhes" onPress={() => navigation.navigate("PokemonDetail")} />
    </View>
  );
}
