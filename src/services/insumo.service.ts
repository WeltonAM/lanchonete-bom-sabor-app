import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Insumo } from "types/Insumo";
import { db } from "./firebase";

const MOCK_USER_ID = "123-mock";

let insumoIdCounter = 1000;

function nextMockId() {
  insumoIdCounter += 1;
  return `i${insumoIdCounter}`;
}

/* 🔹 MOCK EM MEMÓRIA  */
export const MOCK_INSUMOS: Insumo[] = [
  {
    id: "i1",
    nome: "Pão de Hambúrguer com Gergelim",
    estoque: 120,
    estoqueMinimo: 30,
    unidade: "un",
    categoria: "Ingredientes",
  },
  {
    id: "i2",
    nome: "Carne Bovina (Hambúrguer 120g)",
    estoque: 15,
    estoqueMinimo: 5,
    unidade: "kg",
    categoria: "Ingredientes",
  },
  {
    id: "i3",
    nome: "Queijo Mussarela",
    estoque: 6,
    estoqueMinimo: 3,
    unidade: "kg",
    categoria: "Ingredientes",
  },
  {
    id: "i4",
    nome: "Bacon",
    estoque: 3,
    estoqueMinimo: 2,
    unidade: "kg",
    categoria: "Ingredientes",
  },
  {
    id: "i5",
    nome: "Batata Congelada",
    estoque: 8,
    estoqueMinimo: 10,
    unidade: "kg",
    categoria: "Ingredientes",
  },
  {
    id: "e1",
    nome: "Embalagem para Hambúrguer",
    estoque: 150,
    estoqueMinimo: 40,
    unidade: "un",
    categoria: "Embalagens",
  },
  {
    id: "b1",
    nome: "Refrigerante Lata",
    estoque: 48,
    estoqueMinimo: 20,
    unidade: "un",
    categoria: "BebidasRevenda",
  },
];

export const insumoService = {
  async listar(userId: string): Promise<Insumo[]> {
    if (userId === MOCK_USER_ID) {
      console.log("📦 Usando INSUMOS mockados");
      return [...MOCK_INSUMOS];
    }

    const ref = collection(db, "insumos");
    const q = query(ref, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Insumo,
    );
  },

  async salvar(userId: string, insumo: Partial<Insumo>) {
    if (userId === MOCK_USER_ID) {
      console.log("🧪 Mock: salvando insumo (memória)");

      const novo: Insumo = {
        id: nextMockId(),
        nome: insumo.nome!,
        estoque: insumo.estoque!,
        estoqueMinimo: insumo.estoqueMinimo,
        unidade: insumo.unidade!,
        categoria: insumo.categoria ?? "Ingredientes",
      };

      MOCK_INSUMOS.push(novo);
      return;
    }

    await addDoc(collection(db, "insumos"), {
      ...insumo,
      userId,
    });
  },

  async atualizar(userId: string, id: string, insumo: Partial<Insumo>) {
    if (!id) throw new Error("ID do insumo é obrigatório");

    if (userId === MOCK_USER_ID) {
      console.log("🧪 Mock: atualizando insumo (memória)");

      const index = MOCK_INSUMOS.findIndex((i) => i.id === id);
      if (index >= 0) {
        MOCK_INSUMOS[index] = {
          ...MOCK_INSUMOS[index],
          ...insumo,
        };
      }

      return;
    }

    const ref = doc(db, "insumos", id);
    await updateDoc(ref, insumo);
  },
};
