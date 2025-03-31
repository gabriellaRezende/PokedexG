import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './src/navegation/TabNavigator';
import { setupDatabase } from './src/database/database';

export default function App() {
  setupDatabase(); //Aqui vai inicializar o Banco de dados

  return (
    <>
      <StatusBar style="auto" />
      <TabNavigator />
    </>
  );
}

