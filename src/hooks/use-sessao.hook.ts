import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

const USER_STORAGE_KEY = "@BomSabor:user";

export function useStorage() {
  const saveUserStorage = useCallback(async (user: any) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      // console.error("Erro ao salvar sessão no Storage", e);
    }
  }, []);

  const getUserStorage = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      // console.error("Erro ao buscar sessão no Storage", e);
      return null;
    }
  }, []);

  const removeUserStorage = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      // console.error("Erro ao remover sessão no Storage", e);
    }
  }, []);

  return { saveUserStorage, getUserStorage, removeUserStorage };
}
