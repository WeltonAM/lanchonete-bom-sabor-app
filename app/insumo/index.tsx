import { ScreenWrapper, commonStyles } from '@/components/ScreenWrapper';
import { useInsumo } from '@/hooks/use-insumo.hook';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Insumo } from 'types/Insumo';
import InsumoForm from './insumo-form';

export default function InsumoIndex() {
    const { insumos, loading } = useInsumo();

    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [insumoEdicao, setInsumoEdicao] = useState<Insumo | null>(null);

    const filtered = useMemo(
        () =>
            insumos.filter((i) =>
                i.nome.toLowerCase().includes(search.toLowerCase())
            ),
        [insumos, search]
    );

    function novoInsumo() {
        setInsumoEdicao(null);
        setModalVisible(true);
    }

    function editarInsumo(insumo: Insumo) {
        setInsumoEdicao(insumo);
        setModalVisible(true);
    }

    return (
        <>
            <ScreenWrapper
                title="Estoque"
                subtitle="Controle de insumos"
                isScrollable={false}
                onAddPress={novoInsumo}
            >
                <View style={commonStyles.searchBar}>
                    <Ionicons name="search" size={20} color="#64748b" />
                    <TextInput
                        style={commonStyles.searchInput}
                        placeholder="Buscar insumo..."
                        placeholderTextColor="#64748b"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    refreshing={loading}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingBottom: 120,
                    }}
                    renderItem={({ item }) => {
                        const isLow = item.estoque <= (item.estoqueMinimo ?? 5);

                        return (
                            <TouchableOpacity
                                onPress={() => editarInsumo(item)}
                                style={[commonStyles.card, isLow && styles.cardLow]}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemName}>{item.nome}</Text>
                                    <Text style={styles.itemMin}>
                                        Min: {item.estoqueMinimo ?? 5} {item.unidade}
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text
                                        style={[
                                            styles.qtyText,
                                            isLow ? styles.textAlert : styles.textSafe,
                                        ]}
                                    >
                                        {item.estoque}
                                    </Text>
                                    <Text style={styles.unitText}>{item.unidade}</Text>
                                </View>

                                {isLow && (
                                    <Ionicons
                                        name="warning"
                                        size={18}
                                        color="#ff4757"
                                        style={{ marginLeft: 10 }}
                                    />
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScreenWrapper>

            {/* 🔹 MODAL CRIAR / EDITAR */}
            <InsumoForm
                visible={modalVisible}
                insumo={insumoEdicao}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    cardLow: {
        borderColor: 'rgba(255, 71, 87, 0.3)',
        backgroundColor: 'rgba(255, 71, 87, 0.05)',
    },
    itemName: { color: '#fff', fontSize: 16, fontWeight: '600' },
    itemMin: { color: '#64748b', fontSize: 12 },
    qtyText: { fontSize: 20, fontWeight: 'bold' },
    textSafe: { color: '#00f2ff' },
    textAlert: { color: '#ff4757' },
    unitText: { color: '#64748b', fontSize: 10, fontWeight: 'bold' },
});