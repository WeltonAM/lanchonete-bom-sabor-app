import { ScreenWrapper, commonStyles } from '@/components/ScreenWrapper';
import { useAuth } from '@/hooks/use-auth.hook';
import { useProdutoVenda } from '@/hooks/use-produto-venda.hook';
import { useVenda } from '@/hooks/use-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ProdutoVenda } from 'types/ProdutoVenda';
import { ItemVenda } from 'types/Venda';

export default function Venda() {
    const { user } = useAuth();
    const { produtosVenda } = useProdutoVenda();
    const { criarVenda, loading } = useVenda();

    const [itens, setItens] = useState<ItemVenda[]>([]);
    const [metodoPagamento, setMetodoPagamento] = useState<
        'dinheiro' | 'cartao' | 'pix'
    >('pix');

    function adicionarProduto(produto: ProdutoVenda) {
        setItens((prev) => {
            const existente = prev.find(
                (i) => i.produtoVendaId === produto.id
            );

            if (existente) {
                return prev.map((i) =>
                    i.produtoVendaId === produto.id
                        ? {
                            ...i,
                            quantidade: i.quantidade + 1,
                            subtotal:
                                (i.quantidade + 1) * i.precoUnitario,
                        }
                        : i
                );
            }

            return [
                ...prev,
                {
                    produtoVendaId: produto.id,
                    nome: produto.nome,
                    quantidade: 1,
                    precoUnitario: produto.preco,
                    subtotal: produto.preco,
                },
            ];
        });
    }

    function removerProduto(produtoId: string) {
        setItens((prev) =>
            prev
                .map((i) =>
                    i.produtoVendaId === produtoId
                        ? {
                            ...i,
                            quantidade: i.quantidade - 1,
                            subtotal:
                                (i.quantidade - 1) * i.precoUnitario,
                        }
                        : i
                )
                .filter((i) => i.quantidade > 0)
        );
    }

    const total = useMemo(
        () => itens.reduce((soma, item) => soma + item.subtotal, 0),
        [itens]
    );

    async function finalizarVenda() {
        if (!user) return;

        if (itens.length === 0) {
            Alert.alert('Venda vazia', 'Adicione ao menos um produto');
            return;
        }

        try {
            await criarVenda(
                {
                    itens,
                    total,
                    metodoPagamento,
                },
                produtosVenda,
                []
            );

            Alert.alert('Sucesso', 'Venda registrada com sucesso!');
            setItens([]);
        } catch (e: any) {
            Alert.alert(
                'Erro',
                e?.message ?? 'Erro ao registrar venda'
            );
        }
    }

    return (
        <ScreenWrapper
            title="Nova Venda"
            subtitle="Registro de pedido"
            isScrollable={false}
        >
            <FlatList
                data={produtosVenda}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={commonStyles.card}
                        onPress={() => adicionarProduto(item)}
                    >
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.preco}>
                                {item.preco.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </Text>
                        </View>

                        <Ionicons
                            name="add-circle"
                            size={28}
                            color="#4ade80"
                        />
                    </TouchableOpacity>
                )}
            />

            <View style={styles.carrinho}>
                {itens.map((item) => (
                    <View
                        key={item.produtoVendaId}
                        style={styles.itemVenda}
                    >
                        <Text style={styles.itemNome}>
                            {item.nome} x{item.quantidade}
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                removerProduto(item.produtoVendaId)
                            }
                        >
                            <Ionicons
                                name="remove-circle"
                                size={22}
                                color="#f87171"
                            />
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.total}>
                    Total:{' '}
                    {total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </Text>

                <TouchableOpacity
                    style={[
                        styles.finalizar,
                        loading && { opacity: 0.6 },
                    ]}
                    onPress={finalizarVenda}
                    disabled={loading}
                >
                    <Text style={styles.finalizarText}>
                        {loading
                            ? 'REGISTRANDO...'
                            : 'FINALIZAR VENDA'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    nome: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    preco: {
        color: '#4ade80',
        marginTop: 4,
    },

    carrinho: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#1e293b',
    },

    itemVenda: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center',
    },

    itemNome: {
        color: '#e5e7eb',
    },

    total: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 12,
    },

    finalizar: {
        backgroundColor: '#22c55e',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    finalizarText: {
        color: '#022c22',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});