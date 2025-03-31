import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './src/navegation/TabNavigator';
import { createTables } from './src/database/database';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('pokedex.db');

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false); // Verifica se o banco de dados está pronto

  useEffect(() => {
    // Função para inicializar o banco de dados
    async function initializeDatabase() {
      await createTables(db);
      setIsDbReady(true); // Depois que o banco for configurado, altere o estado
    }

    initializeDatabase(); // Chama a inicialização do banco
  }, []);

  if (!isDbReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <TabNavigator />
    </>
  );
}
