import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokedexScreen from "../screens/PokedexScreen";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type PokedexStackParamList = {
    Pokedex: undefined;
    PokemonDetail: { pokemonId: number};
    Login: undefined;
    Register: undefined;
}

const Stack = createStackNavigator();

export default function PokedexStackNavigator(){
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#16161A",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff",
                },
            }}>
            <Stack.Screen name="Pokedex" component={PokedexScreen} />
            <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}