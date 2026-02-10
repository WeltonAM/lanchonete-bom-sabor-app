import { ScreenWrapper, commonStyles } from '@/components/ScreenWrapper';
import { useProdutoVenda } from '@/hooks/use-produto-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ProdutoVenda } from 'types/ProdutoVenda';
import ProdutoForm from './produto-form';

export default function ProdutoIndex() {
    const { produtosVenda, loading } = useProdutoVenda();
    const params = useLocalSearchParams<{ novo?: string | string[] }>();
    const router = useRouter();

    const [formVisible, setFormVisible] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] =
        useState<ProdutoVenda | null>(null);

    function abrirNovo() {
        setProdutoSelecionado(null);
        setFormVisible(true);
    }

    function abrirEdicao(produto: ProdutoVenda) {
        setProdutoSelecionado(produto);
        setFormVisible(true);
    }

    function fecharForm() {
        setFormVisible(false);
        setProdutoSelecionado(null);
    }

    useEffect(() => {
        const novo =
            typeof params.novo === 'string'
                ? params.novo
                : params.novo?.[0];

        if (novo === 'true') {
            setProdutoSelecionado(null);
            setFormVisible(true);

            router.setParams({ novo: undefined });
        }
    }, [params.novo]);

    return (
        <>
            <ScreenWrapper
                title="Produtos"
                subtitle="Gestão de itens e fichas técnicas"
                isScrollable={false}
                onAddPress={abrirNovo}
            >
                <FlatList
                    data={produtosVenda}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingBottom: 120,
                    }}
                    renderItem={({ item }) => {
                        const fichaOk = item.fichaTecnica.length > 0;

                        return (
                            <TouchableOpacity
                                style={commonStyles.card}
                                onPress={() => abrirEdicao(item)}
                            >
                                <View>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                    <Text style={styles.categoria}>
                                        {item.categoria}
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.preco}>
                                        {item.preco.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </Text>

                                    <View style={commonStyles.badge}>
                                        <Ionicons
                                            name={
                                                fichaOk
                                                    ? 'checkmark-circle'
                                                    : 'alert-circle'
                                            }
                                            size={14}
                                            color={
                                                fichaOk
                                                    ? '#4ade80'
                                                    : '#facc15'
                                            }
                                        />
                                        <Text
                                            style={[
                                                styles.statusText,
                                                {
                                                    color: fichaOk
                                                        ? '#4ade80'
                                                        : '#facc15',
                                                },
                                            ]}
                                        >
                                            {fichaOk
                                                ? 'Ficha OK'
                                                : 'Incompleto'}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScreenWrapper>

            <ProdutoForm
                visible={formVisible}
                produto={produtoSelecionado}
                onClose={fecharForm}
            />
        </>
    );
}

const styles = StyleSheet.create({
    nome: { color: '#fff', fontSize: 16, fontWeight: '600' },
    categoria: {
        color: '#64748b',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    preco: {
        color: '#4ade80',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});