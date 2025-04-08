import { useContext, useEffect, useState } from "react";
import { checkIfFavorited, checkIfCaptured, toggleFavorite, toggleCaptured } from "../hook/usePokemonstatus";
import { AuthContext } from "../navegation/AuthContext"; // Import AuthContext


export function usePokemonStatus(pokemonId: number, id: any) {
  const { user } = useContext(AuthContext)!; // acessa diretamente o contexto
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    checkIfFavorited(user.id, pokemonId).then(setIsFavorited);
    checkIfCaptured(user.id, pokemonId).then(setIsCaptured);
  }, [pokemonId, user?.id]);

  const toggleFav = async () => {
    if (!user?.id) return;
    await toggleFavorite(user.id, pokemonId);
    setIsFavorited((prev) => !prev);
  };

  const toggleCap = async () => {
    if (!user?.id) return;
    await toggleCaptured(user.id, pokemonId);
    setIsCaptured((prev) => !prev);
  };

  return { isFavorited, isCaptured, toggleFav, toggleCap };
}
