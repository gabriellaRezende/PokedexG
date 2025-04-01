import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen"; 
import PokedexScreen from "../screens/PokedexScreen"; 
import LoginScreen from "../screens/LoginScreen"; 
import ContaScreen from "../screens/ContaScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import PokedexStackNavigator from "./PokedexStackNavigator";

const Tab = createBottomTabNavigator();

const isUserLoggedIn = false; // Simula o estado de login (vai ser dinamico)

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Pokédex") {
                        iconName = "list";
                    } else if (route.name === "Conta") {
                        iconName = "person";
                    } else {
                        iconName = "log-in";
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#FFD900",
                tabBarInactiveTintColor: "#94A1B2",
                tabBarStyle: { backgroundColor: "#16161A" },
                tabBarLabelStyle: { color: "#fff" },
                headerStyle: { backgroundColor: "#16161A" },
                headerTitleStyle: { color: "#fff" }
            })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen 
          name="Pokédex" 
          component={PokedexStackNavigator} 
          options={{
            headerShown: false, // Esconde o header padrão do Stack Navigator

          }} 
        />
        {isUserLoggedIn ? (
            <Tab.Screen name="Conta" component={ContaScreen}  />
        ) : ( 
            <Tab.Screen name="Login" component={LoginScreen} options={{
                tabBarStyle: { display: 'none' }, // Esconde a aba de login
              }} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

