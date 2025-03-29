import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen"; 
import PokedexScreen from "../screens/PokedexScreen"; 
import LoginScreen from "../screens/LoginScreen"; 
import ContaScreen from "../screens/ContaScreen";
import { Ionicons } from "@expo/vector-icons";
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
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pokédex" component={PokedexStackNavigator} />
        {isUserLoggedIn ? (
            <>
                <Tab.Screen name="Conta" component={ContaScreen} />
            </>
        ) : ( 
            <Tab.Screen name="Login" component={LoginScreen} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
