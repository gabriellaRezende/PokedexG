import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen"; 
import LoginScreen from "../screens/LoginScreen"; 
import ContaScreen from "../screens/ContaScreen";
import { Ionicons } from "@expo/vector-icons";
import PokedexStackNavigator from "./PokedexStackNavigator";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName=
                        route.name === "Home"
                            ? "home"
                            : route.name === "Pokédex"
                            ? "list"
                            : route.name === "Conta"
                            ? "person"
                            : "log-in";

                    /* if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Pokédex") {
                        iconName = "list";
                    } else if (route.name === "Conta") {
                        iconName = "person";
                    } else {
                        iconName = "log-in";
                    } */

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
            <Tab.Screen name="Login" options={{
              headerShown: false, // Esconde o header padrão do Stack Navigator
              }}>
                {props => <LoginScreen {...props} setIsUserLoggedIn={setIsUserLoggedIn} />}
              </Tab.Screen>
    
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

