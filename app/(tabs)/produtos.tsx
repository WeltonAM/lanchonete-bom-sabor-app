import { ScreenWrapper, commonStyles } from '@/components/ScreenWrapper';
import { useProdutoVenda } from '@/hooks/use-produto-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProdutosVendaScreen() {
    const router = useRouter();
    const { produtosVenda, loading } = useProdutoVenda();

    return (
        <ScreenWrapper
            title="Produtos"
            subtitle="Gestão de itens e fichas"
            isScrollable={false}
            onAddPress={() => router.push('/produto/novo')}
        >
            <FlatList
                data={produtosVenda}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={commonStyles.card}
                        onPress={() => router.push({ pathname: '/produto/[id]', params: { id: item.id } })}
                    >
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.categoria}>{item.categoria}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.preco}>{item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                            <View style={commonStyles.badge}>
                                <Ionicons
                                    name={item.fichaTecnica.length > 0 ? 'checkmark-circle' : 'alert-circle'}
                                    size={14}
                                    color={item.fichaTecnica.length > 0 ? '#4ade80' : '#facc15'}
                                />
                                <Text style={[styles.statusText, { color: item.fichaTecnica.length > 0 ? '#4ade80' : '#facc15' }]}>
                                    {item.fichaTecnica.length > 0 ? 'Ficha OK' : 'Incompleto'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    nome: { color: '#fff', fontSize: 16, fontWeight: '600' },
    categoria: { color: '#64748b', fontSize: 12, textTransform: 'uppercase' },
    preco: { color: '#4ade80', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
    statusText: { fontSize: 10, fontWeight: 'bold' },
});