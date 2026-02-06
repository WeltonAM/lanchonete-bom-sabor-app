import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export const AuthService = {
  async logout(callbackLimparEstado: () => Promise<void>) {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Firebase logout ignorado (modo mock ou offline)" + error);
    } finally {
      await callbackLimparEstado();
    }
  },
};
