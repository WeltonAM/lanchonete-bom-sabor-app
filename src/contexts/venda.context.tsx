import { useAuth } from "@/hooks/use-auth.hook";
import { vendasService } from "@/services/venda.service";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Venda } from "types/Venda";

interface VendaContextData {
    vendas: Venda[];
    loading: boolean;
    error: string | null;
    listarVendas: () => Promise<void>;
    totalVendasDia: number;
    pedidosRealizados: number;
    itensVendidos: number;
}

export const VendaContext = createContext<VendaContextData>(
    {} as VendaContextData
);

export function VendaProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    const [vendas, setVendas] = useState<Venda[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listarVendas = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const data = await vendasService.listar(user.uid);
            setVendas(data);
        } catch {
            setError("Erro ao carregar vendas");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        listarVendas();
    }, [listarVendas]);

    const hoje = new Date().toDateString();

    const vendasHoje = vendas.filter(
        (v) => new Date(v.data).toDateString() === hoje
    );

    const totalVendasDia = vendasHoje.reduce(
        (total, venda) => total + venda.total,
        0
    );

    const pedidosRealizados = vendasHoje.length;

    const itensVendidos = vendasHoje.reduce((total, venda) => {
        return (
            total +
            venda.itens.reduce(
                (sub, item) => sub + item.quantidade,
                0
            )
        );
    }, 0);

    return (
        <VendaContext.Provider
            value={{
                vendas,
                loading,
                error,
                listarVendas,
                totalVendasDia,
                pedidosRealizados,
                itensVendidos,
            }}
        >
            {children}
        </VendaContext.Provider>
    );
}