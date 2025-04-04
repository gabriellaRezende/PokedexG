import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// Removed incorrect import of LoginScreenProps

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login"> & {
  setIsUserLoggedIn: (value: boolean) => void;
};

export default function LoginScreen({ navigation, setIsUserLoggedIn }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Preencha todos os campos");
      return;
    }
    
    // Simulação de autenticação
    alert("Login realizado com sucesso");
    setIsUserLoggedIn(true);
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      <Text style={styles.header}>Login</Text> 
      <Text style={styles.description}> Bem Vindo de Volta!! {"\n"} Vamos iniciar nossa aventura?</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)} />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)} />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Ainda não possui conta? <Text style={styles.link}>Faça seu Registro</Text></Text>
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
    width: 300,
    height: 300,
    marginBottom: 0,
    resizeMode: "contain",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
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
    borderRadius: 5,
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
    color: "#16161A",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerLink:{
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