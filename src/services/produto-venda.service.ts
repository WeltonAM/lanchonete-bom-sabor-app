import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ProdutoVenda } from "types/ProdutoVenda";
import { db } from "./firebase";

const MOCK_PRODUTOS_VENDA: ProdutoVenda[] = [
  { id: "p1", nome: "Hambúrguer Artesanal", preco: 25.9, categoria: "Lanches" },
  { id: "p2", nome: "X-Bacon", preco: 28.9, categoria: "Lanches" },
  { id: "p3", nome: "Batata Frita G", preco: 15.0, categoria: "Lanches" },
  {
    id: "p4",
    nome: "Milkshake Chocolate",
    preco: 14.9,
    categoria: "Sobremesas",
  },
  {
    id: "p5",
    nome: "Brownie com Sorvete",
    preco: 16.0,
    categoria: "Sobremesas",
  },
  {
    id: "p6",
    nome: "Combo Hambúrguer + Batata + Refri",
    preco: 39.9,
    categoria: "Combos",
  },
];

export const produtoVendaService = {
  async listar(userId: string): Promise<ProdutoVenda[]> {
    if (userId === "123-mock") {
      console.log("🛒 Usando PRODUTOS DE VENDA mockados");
      return MOCK_PRODUTOS_VENDA;
    }

    const ref = collection(db, "produtosVenda");
    const q = query(ref, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as ProdutoVenda,
    );
  },

  async salvar(userId: string, produto: Partial<ProdutoVenda>) {
    if (userId === "123-mock") {
      alert("Modo mock: operação bloqueada");
      return;
    }

    return await addDoc(collection(db, "produtosVenda"), {
      ...produto,
      userId,
    });
  },
};
