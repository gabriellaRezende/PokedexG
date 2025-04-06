import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../navegation/AuthContext";
import db from "../database/database";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Pokedex: undefined;
};

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !username || !password) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    // Verifica se o email tem o formato correto 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    try {
      const result = await db.getAllAsync(`SELECT * FROM users WHERE email = ? OR login = ?`, [email, username]);

      if (result.length > 0) {
        alert("Email ou login já cadastrados.");
        return;
      }

      await db.runAsync(
        `INSERT INTO users (name, email, login, password) VALUES (?, ?, ?, ?)`,
      [name, email, username, password]
      );

      login(); //Muda o estado para "logado"


    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      alert("Ocorreu um erro ao registrar. Tente novamente.");
      return;
    }
  
  };
  
  return (
    <View style={styles.container}>
        <Image 
        source={require('../../assets/logo.png')} style={styles.logo} 
        />
        <Text style={styles.header}>Registo</Text> 
        <Text style={styles.description}> Faça parte da nossa comunidade e crie sua própria Pokedéx com os seus favoritos e capturados! </Text>
  
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={(setName)} />
  
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(setEmail)} />

          <TextInput
            style={styles.input}
            placeholder="Login"
            value={username}
            onChangeText={(setUsername)} />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(setPassword)} />
            
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        </View>
  
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Ja possui conta? <Text style={styles.link}>Faça seu Login</Text></Text>
        </TouchableOpacity>
      </View>
    );
  
  }
    
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#393D43",
      padding: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 20,
      resizeMode: "contain",
      transform: [{ scale: 1.6 }],
    },
    header: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      color: "#fff",
      textAlign: "center",
      marginBottom: 20,
    },
    form: {
      width: "100%",
    },
    input: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
      marginBottom: 15,
      backgroundColor: "#fff",
    },
    button: {
      backgroundColor: "#FFD900",
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText:{
      color: "#316BB3",
      fontWeight: "bold",
      fontSize: 16,
    },
    loginLink:{
      marginTop: 10,
      color: "#fff",
      textAlign: "center",
      fontSize: 14,
    },
    link:{
      color: "#FFD900",
      fontWeight: "bold",
    },
});