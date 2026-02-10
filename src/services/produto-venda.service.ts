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

const MOCK_USER_ID = "123-mock";

let produtoIdCounter = 1000;

function nextProdutoMockId() {
  produtoIdCounter += 1;
  return `p${produtoIdCounter}`;
}

let MOCK_PRODUTOS_VENDA: ProdutoVenda[] = [
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
    if (userId === MOCK_USER_ID) {
      console.log("📦 Usando PRODUTOS mockados");
      return [...MOCK_PRODUTOS_VENDA];
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
    if (userId === MOCK_USER_ID) {
      console.log("🧪 Mock: criando produto (memória)");

      const novo: ProdutoVenda = {
        ...produto,
        id: nextProdutoMockId(),
      };

      MOCK_PRODUTOS_VENDA.push(novo);
      return;
    }

    await addDoc(collection(db, "produtosVenda"), {
      ...produto,
      userId,
    });
  },

  async atualizar(userId: string, id: string, produto: ProdutoVenda) {
    if (userId === MOCK_USER_ID) {
      console.log("🧪 Mock: atualizando produto (memória)");

      const index = MOCK_PRODUTOS_VENDA.findIndex((p) => p.id === id);
      if (index >= 0) {
        MOCK_PRODUTOS_VENDA[index] = produto;
      }

      return;
    }

    await updateDoc(doc(db, "produtosVenda", id), {
      ...produto,
      userId,
    });
  },

  async remover(userId: string, id: string) {
    if (userId === MOCK_USER_ID) {
      console.log("🧪 Mock: removendo produto (memória)");

      MOCK_PRODUTOS_VENDA = MOCK_PRODUTOS_VENDA.filter((p) => p.id !== id);
      return;
    }

    await deleteDoc(doc(db, "produtosVenda", id));
  },
};
