export interface ItemVenda {
  produtoId: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Venda {
  id?: string;
  data: Date;
  itens: ItemVenda[];
  total: number;
  metodoPagamento: "dinheiro" | "cartao" | "pix";
  usuarioId: string;
}
