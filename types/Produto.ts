export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  quantidadeEstoque: number;
  categoria: string;
  codigoBarras?: string;
  imagemUrl?: string;
}
