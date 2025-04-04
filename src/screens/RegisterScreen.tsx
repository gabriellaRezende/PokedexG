import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !username || !password) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
    alert("Registro realizado com sucesso!");
    navigation.replace("Home");
  };
  
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
        <Text style={styles.description}> Faça parte da nossa comunidade e e crie sua própria Pokedéx!</Text>
  
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
          <Text style={styles.loginLink}>JA possui conta? <Text style={styles.link}>Faça seu Login</Text></Text>
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
      width: 100,
      height: 100,
      marginBottom: 20,
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