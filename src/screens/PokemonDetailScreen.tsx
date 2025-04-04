import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type PokemonDetailScreenRouteProp = RouteProp<{ PokemonDetail: { id: number } }, "PokemonDetail">;

type PokemonDetails = {
  id: number;
  name: string;
  types: { name: string; color: string }[];
  height: number;
  weight: number;
  abilities: string[];
  stats: { name: string; value: number }[];
  description: string;
  image3D: string;
  weaknesses: { name: string; color: string }[];
};

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailScreenRouteProp>();
  const { id } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const typeColors: { [key: string]: string } = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    normal: "#A8A878",
  };

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar detalhes do Pokémon: ${response.status}`);
      }
      const data = await response.json();

      const speciesResponse = await fetch(data.species.url);
      if (!speciesResponse.ok) {
        throw new Error(`Erro ao buscar descrição do Pokémon: ${speciesResponse.status}`);
      }
      const speciesData = await speciesResponse.json();
      const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry: { language: { name: string } }) => entry.language.name === "en"
      );

      // Busca fraquezas do Pokémon
      const typeResponses = await Promise.all(
        data.types.map((t: { type: { url: string } }) => fetch(t.type.url))
      );
      const typeData = await Promise.all(typeResponses.map((res) => res.json()));
      const weaknesses = Array.from(
        new Set(
          typeData.flatMap((type: any) =>
            type.damage_relations.double_damage_from.map((weakness: { name: string }) => weakness.name)
          )
        )
      ).map((weakness) => ({
        name: weakness,
        color: typeColors[weakness] || "#A8A8A8",
      }));

      const details: PokemonDetails = {
        id: data.id,
        name: data.name,
        types: data.types.map((t: { type: { name: string } }) => ({
          name: t.type.name,
          color: typeColors[t.type.name] || "#A8A8A8",
        })),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: { ability: { name: string } }) => a.ability.name),
        stats: data.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        description: descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ") : "Descrição não disponível.",
        image3D: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        weaknesses,
      };

      setPokemonDetails(details);
    } catch (error) {
      console.error("Erro ao buscar detalhes do Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F08030" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!pokemonDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do Pokémon.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagem e Descrição */}
      <Text style={styles.name}>{pokemonDetails.name.toUpperCase()}</Text>
      <Image source={{ uri: pokemonDetails.image3D }} style={styles.image3D} />
      <Text style={styles.description}>{pokemonDetails.description}</Text>

      {/* Informações do Pokémon */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Altura: {pokemonDetails.height / 10} m</Text>
        <Text style={styles.infoText}>Peso: {pokemonDetails.weight / 10} kg</Text>
        <Text style={styles.infoText}>Habilidades: {pokemonDetails.abilities.join(", ")}</Text>
      </View>

      {/* Tipos */}
      <Text style={styles.infoTitle}>Tipos:</Text>
      <View style={styles.typesContainer}>
        {pokemonDetails.types.map((type, index) => (
          <View key={index} style={[styles.typeChip, { backgroundColor: type.color }]}>
            <Text style={styles.typeChipText}>{type.name}</Text>
          </View>
        ))}
      </View>

      {/* Fraquezas */}
      <Text style={styles.infoTitle}>Fraquezas:</Text>
      <View style={styles.typesContainer}>
        {pokemonDetails.weaknesses.map((weakness, index) => (
          <View key={index} style={[styles.typeChip, { backgroundColor: weakness.color }]}>
            <Text style={styles.typeChipText}>{weakness.name}</Text>
          </View>
        ))}
      </View>

      {/* Estatísticas */}
      <Text style={styles.infoTitle}>Estatísticas:</Text>
      {pokemonDetails.stats.map((stat, index) => (
        <View key={index} style={styles.statContainer}>
          <Text style={styles.statName}>{stat.name.toUpperCase()}</Text>
          <View style={styles.statBarBackground}>
            <View style={[styles.statBar, { width: `${(stat.value / 255) * 100}%` }]} />
          </View>
          <Text style={styles.statValue}>{stat.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#393D43",
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFE",
    marginBottom: 20,
  },
  image3D: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#FFFFFE",
    marginBottom: 20,
    textAlign: "center",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#16161A",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#FFFFFE",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F08030",
    marginTop: 10,
  },
  typesContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  typeChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  typeChipText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFE",
  },
  statContainer: {
    marginTop: 10,
  },
  statName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFE",
    marginBottom: 4,
  },
  statBarBackground: {
    height: 10,
    backgroundColor: "#A8A8A8",
    borderRadius: 5,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    backgroundColor: "#F08030",
  },
  statValue: {
    fontSize: 14,
    color: "#FFFFFE",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#393D43",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#FFFFFE",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#393D43",
  },
  errorText: {
    fontSize: 18,
    color: "#FF6B6B",
  },
});