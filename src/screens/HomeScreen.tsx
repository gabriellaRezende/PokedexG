import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, ActivityIndicator, GestureResponderEvent } from "react-native";

export default function HomeScreen() {
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [showFavorites, setShowFavorites] = useState(true); // Estado para alternar entre favoritos e capturados

  // Função para buscar o nome do usuário no banco de dados
  const fetchUserName = async () => {
    try {
      // Simulação de uma chamada ao banco de dados
      const response = await fetch("https://api.exemplo.com/user"); // Tem que colocar a URL correta da API
      const data = await response.json();
      setUserName(data.name); // Define o nome do usuário no estado
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Busca o nome do usuário ao carregar a tela
  useEffect(() => {
    fetchUserName();
  }, []);

  if (isLoading) {
    // Exibe um indicador de carregamento enquanto busca os dados
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F08030" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  function handleLogout(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      {/* Nome do usuário */}
      <Text style={styles.welcomeText}>Olá, {userName}!</Text>

      {/* Switch para alternar entre favoritos e capturados */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {showFavorites ? "Pokémons Favoritos" : "Pokémons Capturados"}
        </Text>
        <Switch
          value={showFavorites}
          onValueChange={(value) => setShowFavorites(value)}
          thumbColor="#FFFFFF"
          trackColor={{ false: "#767577", true: "#FF0000" }}
        />
      </View>

      {/* Lista de Pokémon (placeholder) */}
      <View style={styles.listContainer}>
        <Text style={styles.listText}>
          {showFavorites
            ? "Exibindo seus Pokémon favoritos..."
            : "Exibindo seus Pokémon capturados..."}
        </Text>
      </View>
      {/* Botão de Logout */}
      <View style={styles.logoutContainer}>
        <Text style={styles.logoutButton} onPress={handleLogout}>
          Logout
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: "flex-end", // Alinha o botão à direita
    marginBottom: 10, // Espaçamento inferior
  },
  logoutButton: {
    fontSize: 16,
    color: "#FFFFFF", // Cor vermelha para o botão de logout
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#393D43",
    padding: 20,
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
    color: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});