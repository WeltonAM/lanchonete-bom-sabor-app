import { useAuth } from "@/hooks/use-auth.hook";
import { produtoVendaService } from "@/services/produto-venda.service";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { ProdutoVenda } from "types/ProdutoVenda";

interface ProdutoVendaContextData {
    produtosVenda: ProdutoVenda[];
    loading: boolean;
    error: string | null;

    listarProdutosVenda: () => Promise<void>;
    criarProdutoVenda: (produto: ProdutoVenda) => Promise<void>;
    atualizarProdutoVenda: (id: string, produto: ProdutoVenda) => Promise<void>;
    removerProdutoVenda: (id: string) => Promise<void>;
}

export const ProdutoVendaContext = createContext<ProdutoVendaContextData>(
    {} as ProdutoVendaContextData
);

export function ProdutoVendaProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    const [produtosVenda, setProdutosVenda] = useState<ProdutoVenda[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listarProdutosVenda = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const data = await produtoVendaService.listar(user.uid);
            setProdutosVenda(data);
        } catch {
            setError("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    }, [user]);

    const criarProdutoVenda = async (produto: ProdutoVenda) => {
        if (!user) return;
        await produtoVendaService.criar(user.uid, produto);
        await listarProdutosVenda();
    };

    const atualizarProdutoVenda = async (id: string, produto: ProdutoVenda) => {
        if (!user) return;
        await produtoVendaService.atualizar(user.uid, id, produto);
        await listarProdutosVenda();
    };

    const removerProdutoVenda = async (id: string) => {
        if (!user) return;
        await produtoVendaService.remover(user.uid, id);
        await listarProdutosVenda();
    };

    useEffect(() => {
        listarProdutosVenda();
    }, [listarProdutosVenda]);

    return (
        <ProdutoVendaContext.Provider
            value={{
                produtosVenda,
                loading,
                error,
                listarProdutosVenda,
                criarProdutoVenda,
                atualizarProdutoVenda,
                removerProdutoVenda,
            }}
        >
            {children}
        </ProdutoVendaContext.Provider>
    );
}