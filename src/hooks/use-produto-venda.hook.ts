import { ProdutoVendaContext } from "@/contexts/produto-venda.context";
import { useContext } from "react";

export function useProdutoVenda() {
  const context = useContext(ProdutoVendaContext);

  if (!context) {
    throw new Error(
      "useProdutoVenda deve ser usado dentro de um ProdutoVendaProvider",
    );
  }

  return context;
}
