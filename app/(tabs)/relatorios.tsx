import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function Relatorios() {
    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#0f172a', '#000']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.title}>Análise</Text>
                <Text style={styles.subtitle}>Desempenho da Bom Sabor</Text>
            </View>

            {/* Resumo Financeiro */}
            <View style={styles.row}>
                <View style={styles.miniCard}>
                    <Text style={styles.miniLabel}>Ticket Médio</Text>
                    <Text style={styles.miniValue}>R$ 32,50</Text>
                </View>
                <View style={styles.miniCard}>
                    <Text style={styles.miniLabel}>Pedidos</Text>
                    <Text style={styles.miniValue}>128</Text>
                </View>
            </View>

            {/* Seção Mais Vendidos */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Produtos Estrela</Text>
                <View style={styles.rankItem}>
                    <Text style={styles.rankPos}>1º</Text>
                    <Text style={styles.rankName}>X-Salada Especial</Text>
                    <Text style={styles.rankQty}>85 vendidos</Text>
                </View>
                <View style={styles.rankItem}>
                    <Text style={styles.rankPos}>2º</Text>
                    <Text style={styles.rankName}>Batata G</Text>
                    <Text style={styles.rankQty}>62 vendidos</Text>
                </View>
                <View style={styles.rankItem}>
                    <Text style={styles.rankPos}>3º</Text>
                    <Text style={styles.rankName}>Suco de Laranja</Text>
                    <Text style={styles.rankQty}>40 vendidos</Text>
                </View>
            </View>

            {/* Alerta de Desperdício (Foco acadêmico do seu projeto) */}
            <View style={styles.wasteCard}>
                <LinearGradient
                    colors={['rgba(255, 71, 87, 0.2)', 'transparent']}
                    style={styles.wasteGradient}
                />
                <View style={styles.wasteHeader}>
                    <Ionicons name="trash-outline" size={24} color="#ff4757" />
                    <Text style={styles.wasteTitle}>Alerta de Desperdício</Text>
                </View>
                <Text style={styles.wasteDesc}>
                    3 itens de hortifruti venceram esta semana. Previsão de perda: <Text style={{ fontWeight: 'bold', color: '#ff4757' }}>R$ 45,00</Text>.
                </Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    background: { ...StyleSheet.absoluteFillObject, height: 1000 },
    header: { padding: 25, paddingTop: 60 },
    title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
    subtitle: { color: '#64748b', fontSize: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
    miniCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        width: (width / 2) - 30,
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 242, 255, 0.1)'
    },
    miniLabel: { color: '#64748b', fontSize: 12, marginBottom: 5 },
    miniValue: { color: '#00f2ff', fontSize: 18, fontWeight: 'bold' },
    section: { padding: 20 },
    sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    rankItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 15,
        borderRadius: 12,
        marginBottom: 8
    },
    rankPos: { color: '#00f2ff', fontWeight: 'bold', marginRight: 15, fontSize: 16 },
    rankName: { color: '#fff', flex: 1 },
    rankQty: { color: '#64748b', fontSize: 12 },
    wasteCard: { margin: 20, padding: 20, borderRadius: 15, overflow: 'hidden', backgroundColor: 'rgba(255, 71, 87, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 71, 87, 0.2)' },
    wasteGradient: { ...StyleSheet.absoluteFillObject },
    wasteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    wasteTitle: { color: '#ff4757', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
    wasteDesc: { color: '#94a3b8', lineHeight: 20 }
});