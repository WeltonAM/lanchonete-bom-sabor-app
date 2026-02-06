import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Produto } from "types/Produto";
import { db } from "./firebase";

const prodRef = collection(db, "produtos");

export const ProdutosService = {
  async listarTodos(): Promise<Produto[]> {
    const snapshot = await getDocs(prodRef);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Produto,
    );
  },

  async salvar(produto: Produto) {
    return await addDoc(prodRef, produto);
  },

  async atualizar(id: string, dados: Partial<Produto>) {
    const docRef = doc(db, "produtos", id);
    return await updateDoc(docRef, dados);
  },
};
