export interface Insumo {
  id: string;
  nome: string;
  estoque: number;
  estoqueMinimo?: number;
  unidade: "un" | "kg" | "L";
  categoria: "Ingredientes" | "Embalagens" | "BebidasRevenda";
}
