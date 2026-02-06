import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ProdutoVenda } from "types/ProdutoVenda";
import { db } from "./firebase";

const MOCK_PRODUTOS_VENDA: ProdutoVenda[] = [
  {
    id: "p1",
    nome: "Hambúrguer Artesanal",
    preco: 25.9,
    categoria: "Lanches",
    fichaTecnica: [],
  },
  {
    id: "p2",
    nome: "X-Bacon",
    preco: 28.9,
    categoria: "Lanches",
    fichaTecnica: [],
  },
  {
    id: "p3",
    nome: "Batata Frita G",
    preco: 15.0,
    categoria: "Lanches",
    fichaTecnica: [],
  },
];

export const produtoVendaService = {
  async listar(userId: string): Promise<ProdutoVenda[]> {
    if (userId === "123-mock") {
      return MOCK_PRODUTOS_VENDA;
    }

    const q = query(
      collection(db, "produtosVenda"),
      where("userId", "==", userId),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as ProdutoVenda,
    );
  },

  async criar(userId: string, produto: ProdutoVenda) {
    if (userId === "123-mock") return;

    await addDoc(collection(db, "produtosVenda"), {
      ...produto,
      userId,
    });
  },

  async atualizar(userId: string, id: string, produto: ProdutoVenda) {
    if (userId === "123-mock") return;

    await updateDoc(doc(db, "produtosVenda", id), {
      ...produto,
      userId,
    });
  },

  async remover(userId: string, id: string) {
    if (userId === "123-mock") return;

    await deleteDoc(doc(db, "produtosVenda", id));
  },
};
