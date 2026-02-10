import { useProdutoVenda } from '@/hooks/use-produto-venda.hook';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ProdutoVenda } from 'types/ProdutoVenda';

interface Props {
    visible: boolean;
    produto: ProdutoVenda | null;
    onClose: () => void;
}

export default function ProdutoForm({ visible, produto, onClose }: Props) {
    const { criarProdutoVenda, atualizarProdutoVenda } = useProdutoVenda();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] =
        useState<ProdutoVenda['categoria']>('Lanches');

    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const isEdit = !!produto;

    useEffect(() => {
        if (produto) {
            setNome(produto.nome);
            setPreco(String(produto.preco));
            setCategoria(produto.categoria);
        } else {
            limpar();
        }
    }, [produto, visible]);

    function limpar() {
        setNome('');
        setPreco('');
        setCategoria('Lanches');
    }

    async function handleSalvar() {
        if (!nome || !preco) return;

        const payload: ProdutoVenda = {
            id: produto?.id ?? "",
            nome,
            preco: Number(preco),
            categoria,
            fichaTecnica: produto?.fichaTecnica ?? [],
        };

        try {
            setSubmitting(true);

            if (isEdit && produto) {
                await atualizarProdutoVenda(produto.id, payload);
                setFeedback({
                    type: 'success',
                    message: 'Produto atualizado com sucesso',
                });
            } else {
                await criarProdutoVenda(payload);
                setFeedback({
                    type: 'success',
                    message: 'Produto cadastrado com sucesso',
                });
            }

            limpar();
        } catch {
            setFeedback({
                type: 'error',
                message: 'Erro ao salvar produto. Tente novamente.',
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                {isEdit ? 'Editar produto' : 'Novo produto'}
                            </Text>

                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="close" size={22} color="#94a3b8" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.form}>
                                <Input
                                    label="Nome"
                                    value={nome}
                                    onChangeText={setNome}
                                />

                                <Input
                                    label="Preço"
                                    value={preco}
                                    onChangeText={setPreco}
                                    keyboardType="numeric"
                                />

                                <Select
                                    label="Categoria"
                                    value={categoria}
                                    onChange={setCategoria}
                                    options={[
                                        { label: 'Lanches', value: 'Lanches' },
                                        { label: 'Combos', value: 'Combos' },
                                        { label: 'Bebidas', value: 'Bebidas' },
                                        { label: 'Sobremesas', value: 'Sobremesas' },
                                    ]}
                                />
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                submitting && { opacity: 0.6 },
                            ]}
                            disabled={submitting}
                            onPress={handleSalvar}
                        >
                            <Text style={styles.buttonText}>
                                {submitting
                                    ? 'Salvando...'
                                    : isEdit
                                        ? 'Salvar alterações'
                                        : 'Cadastrar produto'}
                            </Text>
                        </TouchableOpacity>

                        {feedback && (
                            <View style={styles.feedbackOverlay}>
                                <View style={styles.feedbackBox}>
                                    <Ionicons
                                        name={
                                            feedback.type === 'success'
                                                ? 'checkmark-circle'
                                                : 'close-circle'
                                        }
                                        size={48}
                                        color={
                                            feedback.type === 'success'
                                                ? '#4ade80'
                                                : '#ff4757'
                                        }
                                    />

                                    <Text style={styles.feedbackText}>
                                        {feedback.message}
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.feedbackButton}
                                        onPress={() => {
                                            setFeedback(null);
                                            if (feedback.type === 'success') {
                                                onClose();
                                            }
                                        }}
                                    >
                                        <Text style={styles.feedbackButtonText}>
                                            OK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

function Input(props: {
    label: string;
    value: string;
    onChangeText: (v: string) => void;
    keyboardType?: 'default' | 'numeric';
}) {
    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType ?? 'default'}
                placeholderTextColor="#64748b"
            />
        </View>
    );
}

function Select<T extends string>(props: {
    label: string;
    value: T;
    onChange: (v: T) => void;
    options: { label: string; value: T }[];
}) {
    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{props.label}</Text>

            <View style={styles.selectContainer}>
                <Picker
                    selectedValue={props.value}
                    onValueChange={(v) => props.onChange(v)}
                    mode="dropdown"
                    style={styles.picker}
                    dropdownIconColor="#ffffff"
                >
                    {props.options.map((opt) => (
                        <Picker.Item
                            key={opt.value}
                            label={opt.label}
                            value={opt.value}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#020617',
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    form: {
        marginBottom: 20,
    },
    label: {
        color: '#94a3b8',
        fontSize: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#020617',
        borderWidth: 1,
        borderColor: '#1e293b',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: '#fff',
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#1e293b',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#020617',
    },
    picker: {
        color: '#ffffff',
        backgroundColor: '#020617',
    },
    button: {
        backgroundColor: '#00f2ff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#020617',
        fontWeight: 'bold',
        fontSize: 14,
    },
    feedbackOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedbackBox: {
        backgroundColor: '#020617',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
    },
    feedbackText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 16,
    },
    feedbackButton: {
        backgroundColor: '#00f2ff',
        paddingHorizontal: 32,
        paddingVertical: 10,
        borderRadius: 10,
    },
    feedbackButtonText: {
        color: '#020617',
        fontWeight: 'bold',
    },
});