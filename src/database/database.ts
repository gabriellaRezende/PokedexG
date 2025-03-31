import { openDatabaseSync, type SQLiteDatabase } from "expo-sqlite";

const db = openDatabaseSync("pokedex.db");

export async function createTables(database: SQLiteDatabase) {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          login TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
    );
      `)

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS favorites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          pokemon_name TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users (id)
    );
      `)

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS captured (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          pokemon_name TEXT NOT NULL,
          status TEXT CHECK(status IN ('captured', 'lost')) NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users (id)
    );
      `)

      console.log("Database created successfully");

  } catch (error) {
      console.error("Error creating database: ", error);
  }
}

export default db;

createTables(db);