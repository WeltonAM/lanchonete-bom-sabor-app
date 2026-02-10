import { useAuth } from "@/hooks/use-auth.hook";
import { insumoService } from "@/services/insumo.service";
import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Insumo } from "types/Insumo";

export interface CriarInsumoDTO {
    nome: string;
    estoque: number;
    estoqueMinimo?: number;
    unidade: Insumo["unidade"];
    categoria?: Insumo["categoria"];
}

interface InsumoContextData {
    insumos: Insumo[];
    loading: boolean;
    error: string | null;

    listarInsumos: () => Promise<void>;
    criarInsumo: (insumo: CriarInsumoDTO) => Promise<void>;
    editarInsumo: (
        id: string,
        insumo: Partial<CriarInsumoDTO>
    ) => Promise<void>;

    alertasEstoque: number;
}

export const InsumoContext = createContext({} as InsumoContextData);

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
        } catch (e) {
            console.error(e);
            setError("Erro ao carregar insumos");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        listarInsumos();
    }, [listarInsumos]);

    const criarInsumo = useCallback(
        async (insumo: CriarInsumoDTO) => {
            if (!user) return;

            setLoading(true);
            setError(null);

            try {
                await insumoService.salvar(user.uid, insumo);

                const novoInsumo: Insumo = {
                    id: `local-${Date.now()}`,
                    nome: insumo.nome,
                    estoque: insumo.estoque,
                    estoqueMinimo: insumo.estoqueMinimo,
                    unidade: insumo.unidade,
                    categoria: insumo.categoria ?? "Ingredientes",
                };

                setInsumos((prev) => [...prev, novoInsumo]);
            } catch (e) {
                console.error(e);
                setError("Erro ao criar insumo");
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [user]
    );

    const editarInsumo = useCallback(
        async (id: string, insumo: Partial<CriarInsumoDTO>) => {
            if (!user || !id) return;

            setLoading(true);
            setError(null);

            try {
                const payload = Object.fromEntries(
                    Object.entries(insumo).filter(
                        ([_, value]) => value !== undefined
                    )
                );

                await insumoService.atualizar(user.uid, id, payload);

                setInsumos((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, ...payload } : item
                    )
                );
            } catch (e) {
                console.error(e);
                setError("Erro ao editar insumo");
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [user]
    );

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
                criarInsumo,
                editarInsumo,
                alertasEstoque,
            }}
        >
            {children}
        </InsumoContext.Provider>
    );
}