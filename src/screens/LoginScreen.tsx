import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type loginScreenProps = NativeStackScreenProps<RootStackParamList, "Login"> & { setIsUserLoggedIn: (value: boolean) => void;
 };

export default function LoginScreen({ navigation, setIsUserLoggedIn }: loginScreenProps) {
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
    <View>
      <Image source={require('assets/XMLID_83_.svg')}/>
      <Text>Login</Text> 
      <Text> Bem Vindo de Volta!! {"\n"} Vamos iniciar nossa aventura?</Text>

      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)} />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={username}
          onChangeText={(text) => setUsername(text)} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Ainda não possui conta? <Text>Faça seu Registro</Text></Text>
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
  logo: {},
  header: {},
  description: {},
  form: {},
  input: {},
  button: {},
  buttonText:{},
  registerLink:{},
  link:{},
});