import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ParamList } from "../navegation/navegation"; // Importando o tipo ParamList
import { FlatList } from "react-native-gesture-handler";
import { types } from "@babel/core";

interface Pokemon {
  types: string[];
  id: number;
  name: string;
  type: string;
  image: string;
}

export default function PokedexScreen() {
    const navigation = useNavigation<NavigationProp<ParamList>>(); // Usando o tipo ParamList para tipar a navegação
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // Usando o tipo Pokemon para tipar o estado

    useEffect(() => {
      async function fetchPokemon() {
        try {
          // Fetching Pokémon data from the API
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
          const data = await response.json()

          const detailedPokemons = await Promise.all(data.results.map(async (pokemon: {name: string; url: string }) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemon.name,
              types: pokemonData.types.map((t: any) => t.type.name),
              image: pokemonData.sprites.front_default || "",
            };
          }));
          setPokemonList(detailedPokemons);
        } catch (error) {
          console.error("Error ao buscar Pokémon:", error);
        }
      }
      fetchPokemon();
    }, []);

    //Incluir tipos para chips com um switch 
    const getTypeChipColor = (type: string): string => {
      switch (type.toLowerCase()) {
        case "fire":
          return "#F08030";
        case "water":
          return "#6890F0";
        case "grass":
          return "#78C850";
        case "electric":
          return "#F8D030";
        case "psychic":
          return "#F85888";
        case "ice":
          return "#98D8D8";
        case "dragon":
          return "#7038F8";
        case "dark":
          return "#705848";
        case "fairy":
          return "#EE99AC";
        default:
          return "#A8A878";
      }
    };


  return (
    <View style={styles.container}>
      <FlatList 
        data={pokemonList} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PokemonDetail", { id: item.id})}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.name}> {item.name}</Text>
              <View style={styles.typesContainer}>
                {item.types.map((type, index) => (
                  <View key={index} style={[styles.typeChip, { backgroundColor: getTypeChipColor(type) }]}>
                    <Text style={styles.typeChipText}>{type}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393D43",
    padding: 10,
  },
  card:{
    flexDirection: "row",
    backgroundColor: "#16161A",
    borderRadius: 4,
    gap: 16,
    padding: 16,
    marginVertical: 4,
    alignItems: "flex-start",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 0,
  },
  name:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFE",
  },
  typesContainer:{
    flexDirection: "row",
    paddingTop: 24, 
  },
  typeChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  typeChipText:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFE",
  },
});