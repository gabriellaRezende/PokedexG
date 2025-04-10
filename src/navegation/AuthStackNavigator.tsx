//Gerencia a navegação entre login e registro

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { ParamList } from "./navegation";

const AuthStack = createNativeStackNavigator<ParamList>();

export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }} >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}  