export interface ProdutoVenda {
  id: string;
  nome: string;
  preco: number;
  categoria: "Lanches" | "Combos" | "Bebidas" | "Sobremesas";

  fichaTecnica: InsumoConsumido[];
}

export interface InsumoConsumido {
  insumoId: string;
  quantidade: number;
}
