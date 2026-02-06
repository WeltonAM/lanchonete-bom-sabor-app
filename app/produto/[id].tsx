import { useProdutoVenda } from '@/hooks/use-produto-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EditarProdutoVenda() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { produtosVenda, atualizarProdutoVenda, removerProdutoVenda } =
        useProdutoVenda();

    const produto = produtosVenda.find((p) => p.id === id);

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');

    useEffect(() => {
        if (produto) {
            setNome(produto.nome);
            setPreco(String(produto.preco));
        }
    }, [produto]);

    if (!produto) {
        return <Text style={{ color: '#fff', padding: 20 }}>Produto não encontrado</Text>;
    }

    async function salvar() {
        await atualizarProdutoVenda(produto.id, {
            nome,
            preco: Number(preco),
        });

        router.back();
    }

    async function remover() {
        await removerProdutoVenda(produto.id);
        router.replace('/(tabs)/produtos');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Produto</Text>

            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                value={preco}
                keyboardType="numeric"
                onChangeText={setPreco}
            />

            <TouchableOpacity style={styles.saveButton} onPress={salvar}>
                <Ionicons name="save-outline" size={20} color="#000" />
                <Text style={styles.saveText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={remover}>
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <Text style={styles.deleteText}>Excluir Produto</Text>
            </TouchableOpacity>
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
    saveButton: {
        backgroundColor: '#00f2ff',
        height: 50,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 10,
    },
    saveText: { fontWeight: 'bold', color: '#000' },
    deleteButton: {
        marginTop: 20,
        height: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#ff4757',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    deleteText: { color: '#ff4757', fontWeight: 'bold' },
});