import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
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
  image: string;
  weaknesses: { name: string; color: string }[];
};

export default function PokemonDetailScreen() {
  const route = useRoute<PokemonDetailScreenRouteProp>();
  const { id } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptured, setIsCaptured] = useState(false); // Estado para capturar ou liberar o Pokémon
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar o favorito
  const [captureMessage, setCaptureMessage] = useState(""); // Mensagem de captura/liberação
  const [showPopup, setShowPopup] = useState(false); // Estado para exibir o popup

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
        types: data.types.map((t: { type: { name: string; }; }) => ({
          name: t.type.name,
          color: typeColors[t.type.name] || "#A8A8A8",
        })),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: { ability: { name: string; }; }) => a.ability.name),
        stats: data.stats.map((s: { stat: { name: string; }; base_stat: number; }) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        description: descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ") : "Descrição não disponível.",
        image3D: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        weaknesses,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
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
        <ActivityIndicator size="large" color="#FFCB05" />
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
      {/* Imagem grande */}
      <Text>
        {/* Popup de captura/liberação */}
        <View style={styles.nameContainer}>
          
          {showPopup && (
            <View style={styles.popup}>
              <Text style={styles.popupText}>{captureMessage}</Text>
            </View>
          )}
        </View>
      </Text>

      {/* Contêiner da descrição */}
      <View style={styles.descriptionCard}>
      <Text style={styles.name}>{pokemonDetails.name.toUpperCase()}</Text>
      <Image source={{ uri: pokemonDetails.image3D }} style={styles.image3D} />
        <Text style={styles.descriptionText}>{pokemonDetails.description}</Text>
        {/* Botão de captura/liberação */}
        <TouchableOpacity
          style={styles.captureButton}
          onPress={() => {
            setIsCaptured(!isCaptured); // Alterna entre capturado e liberado
            const message = !isCaptured
              ? `${pokemonDetails.name} foi capturado!`
              : `${pokemonDetails.name} foi liberado!`;
            setCaptureMessage(message); // Define a mensagem
            setShowPopup(true); // Exibe o popup

            // Oculta o popup após segundos
            setTimeout(() => {
              setShowPopup(false);
            }, 4000);
          }}
        >
          <Image
            source={{
              uri: isCaptured
                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" // Pokébola fechada
                : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png", // Pokébola aberta
            }}
            style={styles.pokeballImage}
          />
        </TouchableOpacity>
      </View>
      {/* Informações do Pokémon */}
      <View style={styles.infoCard}>
        
        {/* Habilidades */}
        <View style={styles.blueContainer}>
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Habilidades: {pokemonDetails.abilities.join(", ")}</Text>
        </View>
        
        {/* Altura */}
        <View style={styles.infoRow}>
          <Image
            source={{ uri: "https://img.icons8.com/ios/50/000000/height.png" }} // Ícone de altura
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>Altura: {pokemonDetails.height / 10} m</Text>
        </View>

        {/* Peso */}
        <View style={styles.infoRow}>
          <Image
            source={{ uri: "https://img.icons8.com/ios/50/000000/scale.png" }} // Ícone de peso
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>Peso: {pokemonDetails.weight / 10} kg</Text>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blueContainer: {
    backgroundColor: "#3B4CCA", // Cor de fundo azul
    padding: 10, // Espaçamento interno
    borderRadius: 15, // Bordas arredondadas
    marginBottom: 16, // Espaçamento inferior
    alignItems: "center", // Centraliza os itens horizontalmente
    justifyContent: "center", // Centraliza os itens verticalmente
  },
  infoRow: {
    flexDirection: "row", // Alinha o ícone e o texto horizontalmente
    alignItems: "center", // Centraliza verticalmente
    marginBottom: 10, // Espaçamento inferior entre as linhasS
  },
  infoIcon: {
    width: 24, // Largura do ícone
    height: 24, // Altura do ícone
    marginRight: 10, // Espaçamento entre o ícone e o texto
    backgroundColor: "#FFFFFF", // Cor de fundo do ícone
  },
  descriptionCard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  smallImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#393D43",
    textAlign: "center",
  },
  captureButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pokeballImage: {
    width: 40,
    height: 40,
  },
  popupText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  captureMessage: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#",
    textAlign: "center",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#393D43",
    padding: 20,
  },
  image3D: {
    width: 250,
    height: 250,
    marginBottom: 20,
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
    color: "#FFFFFE",
    marginTop: 10,
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  typeChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
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
    backgroundColor: "#FFFFFF",

    borderRadius: 5,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    backgroundColor: "#3B4CCA",
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
  nameContainer: {
    flexDirection: "row", // Alinha o nome e o popup horizontalmente
    alignItems: "center", // Centraliza verticalmente
    justifyContent: "space-between", // Espaça os elementos
    width: "100%", // Ocupa toda a largura disponível
    marginBottom: 0, // Espaçamento inferior
    marginBlockStart: 0, // Espaçamento superior
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16161A",
  },
  popup: {
    backgroundColor: "#Ff0000",
    padding: 10, // Espaçamento interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: "center",
    justifyContent: "center",
  },
});