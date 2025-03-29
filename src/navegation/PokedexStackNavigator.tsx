import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokedexScreen from "../screens/PokedexScreen";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";

export type PokedexStackParamList = {
    Pokedex: undefined;
    PokemonDetail: { pokemonId: number};
}

const Stack = createStackNavigator();

export default function PokedexStackNavigator(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Pokédex" component={PokedexScreen} />
            <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
        </Stack.Navigator>
    )
}