import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Insumo } from "types/Insumo";
import { ProdutoVenda } from "types/ProdutoVenda";
import { Venda } from "types/Venda";
import { db } from "./firebase";

export const MOCK_VENDAS: Venda[] = [
  {
    id: "v1",
    usuarioId: "123-mock",
    data: new Date("2026-02-06T12:15:00"),
    metodoPagamento: "pix",
    total: 54.8,
    itens: [
      {
        produtoVendaId: "p1",
        nome: "Hambúrguer Artesanal",
        quantidade: 1,
        precoUnitario: 25.9,
        subtotal: 25.9,
      },
      {
        produtoVendaId: "p3",
        nome: "Batata Frita G",
        quantidade: 1,
        precoUnitario: 15.0,
        subtotal: 15.0,
      },
      {
        produtoVendaId: "p4",
        nome: "Milkshake Chocolate",
        quantidade: 1,
        precoUnitario: 13.9,
        subtotal: 13.9,
      },
    ],
  },

  {
    id: "v2",
    usuarioId: "123-mock",
    data: new Date("2026-02-06T13:05:00"),
    metodoPagamento: "cartao",
    total: 81.7,
    itens: [
      {
        produtoVendaId: "p2",
        nome: "X-Bacon",
        quantidade: 2,
        precoUnitario: 28.9,
        subtotal: 57.8,
      },
      {
        produtoVendaId: "p3",
        nome: "Batata Frita G",
        quantidade: 1,
        precoUnitario: 15.0,
        subtotal: 15.0,
      },
      {
        produtoVendaId: "p6",
        nome: "Refrigerante Lata",
        quantidade: 1,
        precoUnitario: 8.9,
        subtotal: 8.9,
      },
    ],
  },

  {
    id: "v3",
    usuarioId: "123-mock",
    data: new Date("2026-02-06T18:40:00"),
    metodoPagamento: "dinheiro",
    total: 39.9,
    itens: [
      {
        produtoVendaId: "p7",
        nome: "Combo Hambúrguer + Batata + Refri",
        quantidade: 1,
        precoUnitario: 39.9,
        subtotal: 39.9,
      },
    ],
  },

  {
    id: "v4",
    usuarioId: "123-mock",
    data: new Date("2026-02-05T21:10:00"),
    metodoPagamento: "pix",
    total: 42.8,
    itens: [
      {
        produtoVendaId: "p1",
        nome: "Hambúrguer Artesanal",
        quantidade: 1,
        precoUnitario: 25.9,
        subtotal: 25.9,
      },
      {
        produtoVendaId: "p5",
        nome: "Brownie com Sorvete",
        quantidade: 1,
        precoUnitario: 16.9,
        subtotal: 16.9,
      },
    ],
  },

  {
    id: "v5",
    usuarioId: "123-mock",
    data: new Date("2026-02-05T12:30:00"),
    metodoPagamento: "cartao",
    total: 97.6,
    itens: [
      {
        produtoVendaId: "p2",
        nome: "X-Bacon",
        quantidade: 3,
        precoUnitario: 28.9,
        subtotal: 86.7,
      },
      {
        produtoVendaId: "p6",
        nome: "Refrigerante Lata",
        quantidade: 1,
        precoUnitario: 10.9,
        subtotal: 10.9,
      },
    ],
  },
];

export const vendasService = {
  async listar(userId: string): Promise<Venda[]> {
    if (userId === "123-mock") {
      console.log("💰 Usando VENDAS mockadas");
      return [...MOCK_VENDAS];
    }

    const snapshot = await getDocs(collection(db, "vendas"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Venda);
  },

  async registrarVenda(
    userId: string,
    venda: Venda,
    produtos: ProdutoVenda[],
    insumos: Insumo[],
  ) {
    const mapaInsumos = new Map(insumos.map((i) => [i.id, { ...i }]));
    const insumosAlterados = new Set<string>();

    for (const item of venda.itens) {
      const produto = produtos.find((p) => p.id === item.produtoVendaId);
      if (!produto) continue;

      for (const consumo of produto.fichaTecnica) {
        const insumo = mapaInsumos.get(consumo.insumoId);
        if (!insumo) continue;

        insumo.estoque -= consumo.quantidade * item.quantidade;
        insumosAlterados.add(insumo.id);
      }
    }

    for (const id of insumosAlterados) {
      const insumo = mapaInsumos.get(id)!;
      if (insumo.estoque < 0) {
        throw new Error(`Estoque insuficiente: ${insumo.nome}`);
      }
    }

    if (userId !== "123-mock") {
      await addDoc(collection(db, "vendas"), {
        ...venda,
        usuarioId: userId,
        data: new Date(),
      });

      for (const id of insumosAlterados) {
        const insumo = mapaInsumos.get(id)!;
        await updateDoc(doc(db, "insumos", insumo.id), {
          estoque: insumo.estoque,
        });
      }
    }

    return true;
  },
};
