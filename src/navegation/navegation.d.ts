import { ParamListBase } from '@react-navigation/native';

export type ParamList = ParamListBase & {
  Pokedex: undefined;
  PokemonDetail: { id: number };

  Login: undefined;  
  Register: undefined;
  // Adicione outras rotas e seus parâmetros aqui
};