import { ScreenWrapper, commonStyles } from '@/components/ScreenWrapper';
import { useVenda } from '@/hooks/use-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Relatorios() {
    const {
        vendas,
        totalVendasDia,
        pedidosRealizados,
    } = useVenda();

    const ticketMedio =
        pedidosRealizados === 0
            ? 0
            : totalVendasDia / pedidosRealizados;

    const rankingProdutos = useMemo(() => {
        const mapa = new Map<
            string,
            { nome: string; quantidade: number }
        >();

        vendas.forEach((venda) => {
            venda.itens.forEach((item) => {
                const atual = mapa.get(item.produtoVendaId);

                if (atual) {
                    atual.quantidade += item.quantidade;
                } else {
                    mapa.set(item.produtoVendaId, {
                        nome: item.nome,
                        quantidade: item.quantidade,
                    });
                }
            });
        });

        return Array.from(mapa.values())
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 5);
    }, [vendas]);

    return (
        <ScreenWrapper title="Análise" subtitle="Desempenho da Bom Sabor">
            {/* Resumo */}
            <View style={styles.row}>
                <View style={commonStyles.miniCard}>
                    <Text style={styles.miniLabel}>Ticket Médio</Text>
                    <Text style={styles.miniValue}>
                        {ticketMedio.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </Text>
                </View>

                <View style={commonStyles.miniCard}>
                    <Text style={styles.miniLabel}>Pedidos</Text>
                    <Text style={styles.miniValue}>
                        {pedidosRealizados}
                    </Text>
                </View>
            </View>

            {/* Ranking */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Produtos Estrela
                </Text>

                {rankingProdutos.map((item, index) => (
                    <View
                        key={index}
                        style={commonStyles.card}
                    >
                        <Text style={styles.rankPos}>
                            {index + 1}º
                        </Text>

                        <Text
                            style={{
                                color: '#fff',
                                flex: 1,
                            }}
                        >
                            {item.nome}
                        </Text>

                        <Text style={styles.rankQty}>
                            {item.quantidade} vendidos
                        </Text>
                    </View>
                ))}
            </View>

            {/* Placeholder desperdício */}
            <View style={styles.wasteCard}>
                <LinearGradient
                    colors={[
                        'rgba(255, 71, 87, 0.2)',
                        'transparent',
                    ]}
                    style={StyleSheet.absoluteFill}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}
                >
                    <Ionicons
                        name="trash-outline"
                        size={24}
                        color="#ff4757"
                    />
                    <Text style={styles.wasteTitle}>
                        Alerta de Desperdício
                    </Text>
                </View>

                <Text style={styles.wasteDesc}>
                    Nenhum desperdício registrado hoje.
                </Text>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    miniLabel: { color: '#64748b', fontSize: 12 },
    miniValue: {
        color: '#00f2ff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: { paddingHorizontal: 20 },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    rankPos: {
        color: '#00f2ff',
        fontWeight: 'bold',
        marginRight: 15,
    },
    rankQty: { color: '#64748b', fontSize: 12 },
    wasteCard: {
        margin: 20,
        padding: 20,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 71, 87, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 71, 87, 0.2)',
    },
    wasteTitle: {
        color: '#ff4757',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    wasteDesc: { color: '#94a3b8', lineHeight: 20 },
});