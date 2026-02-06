import { collection, getDocs } from "firebase/firestore";
import { Venda } from "types/Venda";
import { db } from "./firebase";

const MOCK_VENDAS: Venda[] = [
  {
    id: "v1",
    usuarioId: "123-mock",
    data: new Date(),
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
        precoUnitario: 14.9,
        subtotal: 14.9,
      },
    ],
  },
];

export const vendasService = {
  async listar(userId: string): Promise<Venda[]> {
    if (userId === "123-mock") {
      console.log("💰 Usando VENDAS mockadas");
      return MOCK_VENDAS;
    }

    const snapshot = await getDocs(collection(db, "vendas"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Venda);
  },
};
