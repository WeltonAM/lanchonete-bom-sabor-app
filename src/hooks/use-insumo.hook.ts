import { InsumoContext } from "@/contexts/insumo.context";
import { useContext } from "react";

export function useInsumo() {
  const context = useContext(InsumoContext);

  if (!context) {
    throw new Error("useInsumo deve ser usado dentro de um InsumoProvider");
  }

  return context;
}
