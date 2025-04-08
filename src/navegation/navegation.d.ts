import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamList } from "../navegation/navegation";

export type ParamList = ParamListBase & {
  Pokedex: undefined;
  PokemonDetail: { id: number };

  Login: undefined;  
  Register: undefined;
  // Adicione outras rotas e seus parâmetros aqui
};

export type LoginScreenProps = {
  navigation: NativeStackNavigationProp<ParamList, "Login">;
};

export type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<ParamList, "Register">;
  route: RouteProp<ParamList, "Register">;
};