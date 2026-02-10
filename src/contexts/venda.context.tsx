import { useAuth } from "@/hooks/use-auth.hook";
import { vendasService } from "@/services/venda.service";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Insumo } from "types/Insumo";
import { ProdutoVenda } from "types/ProdutoVenda";
import { Venda } from "types/Venda";

interface CriarVendaDTO {
    itens: Venda["itens"];
    total: number;
    metodoPagamento: Venda["metodoPagamento"];
}

interface VendaContextData {
    vendas: Venda[];
    loading: boolean;
    error: string | null;

    listarVendas: () => Promise<void>;

    criarVenda: (
        venda: CriarVendaDTO,
        produtos: ProdutoVenda[],
        insumos: Insumo[]
    ) => Promise<void>;

    totalVendasDia: number;
    pedidosRealizados: number;
    itensVendidos: number;
}

export const VendaContext = createContext({} as VendaContextData);

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

    const criarVenda = useCallback(
        async (
            venda: CriarVendaDTO,
            produtos: ProdutoVenda[],
            insumos: Insumo[]
        ) => {
            if (!user) return;

            setLoading(true);
            setError(null);

            const novaVenda: Venda = {
                ...venda,
                usuarioId: user.uid,
                data: new Date(),
            };

            try {
                await vendasService.registrarVenda(
                    user.uid,
                    novaVenda,
                    produtos,
                    insumos
                );

                setVendas((prev) => [...prev, novaVenda]);
            } catch (e: any) {
                setError(e.message ?? "Erro ao registrar venda");
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [user]
    );

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
            venda.itens.reduce((sub, item) => sub + item.quantidade, 0)
        );
    }, 0);

    return (
        <VendaContext.Provider
            value={{
                vendas,
                loading,
                error,
                listarVendas,
                criarVenda,
                totalVendasDia,
                pedidosRealizados,
                itensVendidos,
            }}
        >
            {children}
        </VendaContext.Provider>
    );
}