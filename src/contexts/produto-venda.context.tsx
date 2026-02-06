import { useAuth } from "@/hooks/use-auth.hook";
import { produtoVendaService } from "@/services/produto-venda.service";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { ProdutoVenda } from "types/ProdutoVenda";

interface ProdutoVendaContextData {
    produtosVenda: ProdutoVenda[];
    loading: boolean;
    error: string | null;
    listarProdutosVenda: () => Promise<void>;
}

export const ProdutoVendaContext = createContext<ProdutoVendaContextData>(
    {} as ProdutoVendaContextData
);

export function ProdutoVendaProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();

    const [produtosVenda, setProdutosVenda] = useState<ProdutoVenda[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listarProdutosVenda = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const data = await produtoVendaService.listar(user.uid);
            setProdutosVenda(data);
        } catch (err) {
            setError("Erro ao carregar produtos de venda");
        } finally {
            setLoading(false);
        }
    }, [user]);

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
            }}
        >
            {children}
        </ProdutoVendaContext.Provider>
    );
}