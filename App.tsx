import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './src/navegation/TabNavigator';
import { createTables } from './src/database/database';
import { openDatabaseSync } from 'expo-sqlite';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/navegation/AuthContext';

// Abre ou cria o banco de dados
const db = openDatabaseSync('pokedex.db');

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false); // Verifica se o banco de dados está pronto

  useEffect(() => {
    // Função para inicializar o banco de dados
    async function initializeDatabase() {
      await createTables(db); // Criação das tabelas do banco de dados
      setIsDbReady(true); // Após criar as tabelas, o banco estará pronto
    }

    initializeDatabase(); // Chama a função de inicialização
  }, []);

  // Verifica se o banco de dados está pronto antes de renderizar o aplicativo
  // Se não estiver pronto, exibe um indicador de carregamento
  if (!isDbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* Condicional para renderizar o navegador de abas após o banco de dados estar pronto */}
      <AuthProvider>
        <TabNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
