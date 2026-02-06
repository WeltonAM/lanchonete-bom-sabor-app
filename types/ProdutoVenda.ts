export interface ProdutoVenda {
  id: string;
  nome: string;
  preco: number;
  categoria: "Lanches" | "Combos" | "Bebidas" | "Sobremesas";
}
