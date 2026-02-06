import { useInsumo } from '@/hooks/use-insumo.hook';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Insumo } from 'types/Insumo';

export default function Estoque() {
    const { insumos, loading } = useInsumo();
    const [search, setSearch] = useState('');

    const filtered = insumos.filter(i =>
        i.nome.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: { item: Insumo }) => {
        const minimo = item.estoqueMinimo ?? 5;
        const isLow = item.estoque <= minimo;

        return (
            <View style={[styles.card, isLow && styles.cardLow]}>
                <View style={styles.cardInfo}>
                    <Text style={styles.itemName}>{item.nome}</Text>
                    <Text style={styles.itemMin}>
                        Mínimo sugerido: {minimo} {item.unidade}
                    </Text>
                </View>

                <View style={styles.cardQty}>
                    <Text style={[styles.qtyText, isLow ? styles.textAlert : styles.textSafe]}>
                        {item.estoque}
                    </Text>
                    <Text style={styles.unitText}>{item.unidade}</Text>
                </View>

                {isLow && (
                    <Ionicons
                        name="warning"
                        size={20}
                        color="#ff4757"
                        style={styles.warningIcon}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0f172a', '#000']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.title}>Estoque</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#64748b" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar insumo..."
                    placeholderTextColor="#64748b"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {loading ? (
                <Text style={styles.empty}>Carregando estoque...</Text>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.empty}>Nenhum item encontrado.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    background: { ...StyleSheet.absoluteFillObject },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, paddingTop: 60 },
    title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
    addButton: { backgroundColor: '#00f2ff', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    searchBar: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', margin: 20, padding: 12, borderRadius: 12, alignItems: 'center' },
    searchInput: { flex: 1, color: '#fff', marginLeft: 10 },
    list: { paddingHorizontal: 20, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.03)',
        marginBottom: 12,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)'
    },
    cardLow: { borderColor: 'rgba(255, 71, 87, 0.3)', backgroundColor: 'rgba(255, 71, 87, 0.05)' },
    cardInfo: { flex: 1 },
    itemName: { color: '#fff', fontSize: 16, fontWeight: '600' },
    itemMin: { color: '#64748b', fontSize: 12, marginTop: 4 },
    cardQty: { alignItems: 'flex-end', marginRight: 10 },
    qtyText: { fontSize: 18, fontWeight: 'bold' },
    textSafe: { color: '#00f2ff' },
    textAlert: { color: '#ff4757' },
    unitText: { color: '#64748b', fontSize: 10 },
    warningIcon: { marginLeft: 5 },
    empty: { color: '#64748b', textAlign: 'center', marginTop: 50 }
});