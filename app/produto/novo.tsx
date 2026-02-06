import { useProdutoVenda } from '@/hooks/use-produto-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function NovoProdutoVenda() {
    const router = useRouter();
    const { criarProdutoVenda } = useProdutoVenda();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState<'Lanches' | 'Combos' | 'Bebidas' | 'Sobremesas'>('Lanches');

    async function salvar() {
        if (!nome || !preco) return;

        await criarProdutoVenda({
            nome,
            preco: Number(preco),
            categoria,
            fichaTecnica: [],
        });

        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Novo Produto</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do produto"
                placeholderTextColor="#64748b"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Preço"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={salvar}>
                    <Ionicons name="checkmark" size={22} color="#000" />
                    <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', padding: 20 },
    title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 14,
        color: '#fff',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    footer: { marginTop: 20 },
    saveButton: {
        backgroundColor: '#00f2ff',
        height: 50,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    saveText: { fontWeight: 'bold', color: '#000' },
});