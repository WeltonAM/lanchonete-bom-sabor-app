import { useAuth } from "@/hooks/use-auth.hook";
import { insumoService } from "@/services/insumo.service";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Insumo } from "types/Insumo";

interface InsumoContextData {
    insumos: Insumo[];
    loading: boolean;
    error: string | null;
    listarInsumos: () => Promise<void>;
    alertasEstoque: number;
}

export const InsumoContext = createContext<InsumoContextData>(
    {} as InsumoContextData
);

export function InsumoProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    const [insumos, setInsumos] = useState<Insumo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listarInsumos = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const data = await insumoService.listar(user.uid);
            setInsumos(data);
        } catch {
            setError("Erro ao carregar insumos");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        listarInsumos();
    }, [listarInsumos]);

    const alertasEstoque = insumos.filter((insumo) => {
        const minimo = insumo.estoqueMinimo ?? 5;
        return insumo.estoque <= minimo;
    }).length;

    return (
        <InsumoContext.Provider
            value={{
                insumos,
                loading,
                error,
                listarInsumos,
                alertasEstoque,
            }}
        >
            {children}
        </InsumoContext.Provider>
    );
}