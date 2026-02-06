import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const EstoqueService = {
  async ajustarEstoque(produtoId: string, quantidade: number) {
    const docRef = doc(db, "produtos", produtoId);
    return await updateDoc(docRef, {
      quantidadeEstoque: increment(quantidade),
    });
  },
};
