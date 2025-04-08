import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { AuthContext } from "../navegation/AuthContext"; // Ajuste o caminho conforme necessário
import { usePokemonStatus } from "../hook/usePokemonstatus"; // Hook customizado para verificar favorito e capturado

// Define o tipo do Pokémon
type Pokemon = {
  id: number;
  name: string;
  types: string[];
  image: string;
};

import { ParamList } from "../navegation/navegation";

export default function PokedexScreen() {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0); // Controle de offset para paginação
  const [hasMore, setHasMore] = useState(true); // Controle para saber se há mais dados

  const { user } = useContext(AuthContext); // Obtém o usuário logado do contexto

  // Função para buscar Pokémon da API
  const fetchPokemon = async () => {
    if (isLoading || !hasMore) return; // Evita múltiplas requisições simultâneas ou requisições desnecessárias

    try {
      setIsLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const pokemonResponse = await fetch(pokemon.url);
          if (!pokemonResponse.ok) {
            throw new Error(`Erro ao buscar detalhes do Pokémon: ${pokemonResponse.status}`);
          }
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemon.name,
            types: pokemonData.types.map((t: { type: { name: string } }) => t.type.name),
            image: pokemonData.sprites.front_default || "",
          };
        })
      );

      setPokemonList((prevList) => [...prevList, ...detailedPokemons]); // Adiciona os novos Pokémon à lista existente
      setOffset((prevOffset) => prevOffset + 10); // Incrementa o offset para a próxima página
      setHasMore(data.next !== null); // Verifica se há mais dados para carregar

    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca inicial ao montar o componente
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Função para determinar a cor do chip de tipo
  function getTypeChipColor(type: string): import("react-native").ColorValue {
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

    return typeColors[type] || "#A8A8A8"; // Cor padrão: cinza
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const { isFavorited, isCaptured, toggleFav, toggleCap } = usePokemonStatus(item.id, user?.id);

          function toggleFavorite(event: GestureResponderEvent): void {
            throw new Error("Function not implemented.");
          }

          function toggleCaptured(event: GestureResponderEvent): void {
            throw new Error("Function not implemented.");
          }

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("PokemonDetail", { id: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.typesContainer}>
                  {item.types.map((type, index) => (
                    <View
                      key={index}
                      style={[styles.typeChip, { backgroundColor: getTypeChipColor(type) }]}
                    >
                      <Text style={styles.typeChipText}>{type}</Text>
                    </View>
                  ))}
                </View>
                {user && (
                  <View style={styles.actionsContainer}>
                    {/* Ícone de Favorito */}
                    <TouchableOpacity onPress={toggleFavorite}>
                      <Image
                        source={isFavorited ? require("../../assets/star_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png") : require("../../assets/star_24dp_FFFF55_FILL1_wght400_GRAD0_opsz24.png")}
                        style={styles.icon}
                      />
                    </TouchableOpacity>

                    {/* Ícone de Capturado */}
                    <TouchableOpacity onPress={toggleCaptured}>
                    <Image
  source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" }}
  style={styles.icon}
/>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={fetchPokemon} // Chama a função para carregar mais Pokémon
        onEndReachedThreshold={0.5} // Define o quão próximo do final da lista o evento é disparado
        ListFooterComponent={
          isLoading ? <Text style={{ color: "#FFFFFE", textAlign: "center" }}>Carregando...</Text> : null
        } // Exibe um indicador de carregamento no final da lista
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
  card: {
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFE",
  },
  typesContainer: {
    flexDirection: "row",
    paddingTop: 24,
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
  actionsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
