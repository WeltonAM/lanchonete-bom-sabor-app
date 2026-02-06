import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const summary = {
  totalVendas: "R$ 1.250,00",
  itensVendidos: 42,
  alertasEstoque: 3
};

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#000']} style={styles.background} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Olá, Bom Sabor!</Text>
            <Text style={styles.dateText}>Resumo de Hoje</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color="#00f2ff" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['rgba(0, 242, 255, 0.2)', 'rgba(0, 102, 255, 0.1)']}
          style={styles.mainCard}
        >
          <Text style={styles.cardLabel}>Vendas do Dia</Text>
          <Text style={styles.cardValueText}>{summary.totalVendas}</Text>
          <View style={styles.cardFooter}>
            <Ionicons name="trending-up" size={16} color="#4ade80" />
            <Text style={styles.cardFooterText}> {summary.itensVendidos} pedidos realizados</Text>
          </View>
        </LinearGradient>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => router.push('/venda')}
          >
            <Ionicons name="cart-outline" size={24} color="#00f2ff" />
            <Text style={styles.smallCardTitle}>Nova Venda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallCard, summary.alertasEstoque > 0 && styles.cardAlert]}
            onPress={() => router.push('/estoque')}
          >
            <Ionicons
              name="alert-circle-outline"
              size={24}
              color={summary.alertasEstoque > 0 ? "#ff4757" : "#00f2ff"}
            />
            <Text style={styles.smallCardTitle}>Estoque Baixo</Text>
            {summary.alertasEstoque > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{summary.alertasEstoque}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/produto/novo')}>
          <View style={[styles.actionIcon, { backgroundColor: '#1e293b' }]}>
            <Ionicons name="add-circle-outline" size={24} color="#00f2ff" />
          </View>
          <View>
            <Text style={styles.actionTitle}>Cadastrar Produto</Text>
            <Text style={styles.actionSub}>Adicionar novo item ao cardápio</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#475569" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/relatorios')}>
          <View style={[styles.actionIcon, { backgroundColor: '#1e293b' }]}>
            <Ionicons name="bar-chart-outline" size={24} color="#00f2ff" />
          </View>
          <View>
            <Text style={styles.actionTitle}>Ver Relatórios</Text>
            <Text style={styles.actionSub}>Análise de lucros e desperdício</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#475569" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { ...StyleSheet.absoluteFillObject },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  welcomeText: { color: '#94a3b8', fontSize: 16 },
  dateText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  profileButton: { padding: 5 },
  mainCard: {
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 255, 0.3)',
    marginBottom: 20,
  },
  cardLabel: { color: '#94a3b8', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 },
  cardValueText: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  cardFooter: { flexDirection: 'row', alignItems: 'center' },
  cardFooterText: { color: '#4ade80', fontSize: 14 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  smallCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  cardAlert: { borderColor: 'rgba(255, 71, 87, 0.4)' },
  smallCardTitle: { color: '#fff', marginTop: 10, fontSize: 14, fontWeight: '500' },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },
  actionIcon: { width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  actionTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  actionSub: { color: '#64748b', fontSize: 12 }
});