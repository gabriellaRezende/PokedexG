import { openDatabaseSync, SQLTransaction } from "expo-sqlite"; 

const db = openDatabaseSync('pokedex.db');

//Criar criar tabela quando iniciar o app
  db.transaction(
    (tx: SQLTransaction) => {
    // Criar tabela de utilizadores
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        login REAL NOT NULL UNIQUE,
        password TEXT NOT NULL
      );`
    );

    // Criar tabela de pokemons favoritos do utilizador
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        pokemon_id INTEGER NOT NULL,
        pokemon_name TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`
    );

    // Pokemons Capturados 
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS captured (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        pokemon_name TEXT NOT NULL,
        status TEXT CHECK(status IN ('captured', 'lost')) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );`
    );

    console.log("Banco de Dados configurado com sucesso!")
  });

export default db;