import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Insumo } from "types/Insumo";
import { db } from "./firebase";

const MOCK_INSUMOS: Insumo[] = [
  // 🔹 INGREDIENTES
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
    estoqueMinimo: 10, // 🔴 alerta
    unidade: "kg",
    categoria: "Ingredientes",
  },
  {
    id: "i6",
    nome: "Leite Integral",
    estoque: 10,
    estoqueMinimo: 5,
    unidade: "L",
    categoria: "Ingredientes",
  },
  {
    id: "i7",
    nome: "Sorvete Creme",
    estoque: 4,
    estoqueMinimo: 3,
    unidade: "L",
    categoria: "Ingredientes",
  },

  // 🔹 EMBALAGENS (não podem faltar)
  {
    id: "e1",
    nome: "Copo Descartável 500ml",
    estoque: 200,
    estoqueMinimo: 50,
    unidade: "un",
    categoria: "Embalagens",
  },
  {
    id: "e2",
    nome: "Embalagem para Hambúrguer",
    estoque: 150,
    estoqueMinimo: 40,
    unidade: "un",
    categoria: "Embalagens",
  },
  {
    id: "e3",
    nome: "Guardanapo",
    estoque: 500,
    estoqueMinimo: 100,
    unidade: "un",
    categoria: "Embalagens",
  },

  // 🔹 BEBIDAS PARA REVENDA
  {
    id: "b1",
    nome: "Refrigerante Lata",
    estoque: 48,
    estoqueMinimo: 20,
    unidade: "un",
    categoria: "BebidasRevenda",
  },
  {
    id: "b2",
    nome: "Refrigerante 600ml",
    estoque: 24,
    estoqueMinimo: 15,
    unidade: "un",
    categoria: "BebidasRevenda",
  },
  {
    id: "b3",
    nome: "Água Mineral",
    estoque: 60,
    estoqueMinimo: 30,
    unidade: "un",
    categoria: "BebidasRevenda",
  },
];

export const insumoService = {
  async listar(userId: string): Promise<Insumo[]> {
    if (userId === "123-mock") {
      console.log("📦 Usando INSUMOS mockados");
      return MOCK_INSUMOS;
    }

    const ref = collection(db, "insumos");
    const q = query(ref, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Insumo,
    );
  },

  async salvar(userId: string, insumo: Partial<Insumo>) {
    if (userId === "123-mock") {
      alert("Modo mock: operação bloqueada");
      return;
    }

    return await addDoc(collection(db, "insumos"), {
      ...insumo,
      userId,
    });
  },
};
