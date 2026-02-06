import { ScreenWrapper, commonStyles } from '@/components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Relatorios() {
    return (
        <ScreenWrapper title="Análise" subtitle="Desempenho da Bom Sabor">
            {/* Resumo Financeiro */}
            <View style={styles.row}>
                <View style={commonStyles.miniCard}>
                    <Text style={styles.miniLabel}>Ticket Médio</Text>
                    <Text style={styles.miniValue}>R$ 32,50</Text>
                </View>
                <View style={commonStyles.miniCard}>
                    <Text style={styles.miniLabel}>Pedidos</Text>
                    <Text style={styles.miniValue}>128</Text>
                </View>
            </View>

            {/* Ranking */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Produtos Estrela</Text>
                {[
                    { pos: '1º', name: 'X-Salada Especial', qty: '85 vendidos' },
                    { pos: '2º', name: 'Batata G', qty: '62 vendidos' },
                ].map((item, index) => (
                    <View key={index} style={commonStyles.card}>
                        <Text style={styles.rankPos}>{item.pos}</Text>
                        <Text style={{ color: '#fff', flex: 1 }}>{item.name}</Text>
                        <Text style={styles.rankQty}>{item.qty}</Text>
                    </View>
                ))}
            </View>

            {/* Alerta de Desperdício */}
            <View style={styles.wasteCard}>
                <LinearGradient colors={['rgba(255, 71, 87, 0.2)', 'transparent']} style={StyleSheet.absoluteFill} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Ionicons name="trash-outline" size={24} color="#ff4757" />
                    <Text style={styles.wasteTitle}>Alerta de Desperdício</Text>
                </View>
                <Text style={styles.wasteDesc}>
                    3 itens de hortifruti venceram. Perda: <Text style={{ fontWeight: 'bold', color: '#ff4757' }}>R$ 45,00</Text>.
                </Text>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
    miniLabel: { color: '#64748b', fontSize: 12 },
    miniValue: { color: '#00f2ff', fontSize: 18, fontWeight: 'bold' },
    section: { paddingHorizontal: 20 },
    sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    rankPos: { color: '#00f2ff', fontWeight: 'bold', marginRight: 15 },
    rankQty: { color: '#64748b', fontSize: 12 },
    wasteCard: { margin: 20, padding: 20, borderRadius: 15, overflow: 'hidden', backgroundColor: 'rgba(255, 71, 87, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 71, 87, 0.2)' },
    wasteTitle: { color: '#ff4757', fontWeight: 'bold', marginLeft: 10 },
    wasteDesc: { color: '#94a3b8', lineHeight: 20 }
});