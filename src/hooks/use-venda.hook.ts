import { VendaContext } from "@/contexts/venda.context";
import { useContext } from "react";

export function useVenda() {
  const context = useContext(VendaContext);

  if (!context) {
    throw new Error("useVenda deve ser usado dentro de um VendaProvider");
  }

  return context;
}
