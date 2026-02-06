import { useAuth } from '@/hooks/use-auth.hook';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { auth } from '../src/services/firebase';

export default function Login() {
    const router = useRouter();
    const { loginMock, error: configError } = useAuth();
    const [email, setEmail] = useState('admin@bomsabor.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (configError) {
            Alert.alert(
                "Aviso de Configuração",
                "O serviço de autenticação real está indisponível. Por favor, utilize as credenciais de Admin para testar.",
                [{ text: "OK" }]
            );
        }
    }, [configError]);

    const handleLogin = async () => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            // --- LÓGICA DE VERIFICAÇÃO MOCK ---
            if (cleanEmail === 'admin@bomsabor.com' && cleanPassword === '123456') {
                await loginMock();
                // O redirecionamento será feito pelo useEffect do _layout.tsx ao detectar o user
                return;
            }

            // --- LÓGICA REAL (Firebase) ---
            await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);

        } catch (error: any) {
            let mensagem = 'E-mail ou senha inválidos.';

            if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || error.code === 'auth/api-key-not-valid') {
                mensagem = 'Firebase não configurado corretamente. Use as credenciais de Admin (Mock).';
            } else if (error.code === 'auth/network-request-failed') {
                mensagem = 'Erro de conexão. Verifique sua internet.';
            }

            Alert.alert('Erro no Login', mensagem);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#0f172a', '#1e1b4b', '#000000']} style={styles.background} />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="fast-food" size={50} color="#00f2ff" />
                    </View>
                    <Text style={styles.title}>Bom Sabor</Text>
                    <Text style={styles.subtitle}>Gerenciamento de Lanchonete</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#00f2ff" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#64748b"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#00f2ff" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#64748b"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && { opacity: 0.7 }]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <LinearGradient
                            colors={['#00f2ff', '#0066ff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>ENTRAR</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    background: { ...StyleSheet.absoluteFillObject },
    content: { flex: 1, justifyContent: 'center', padding: 30 },
    header: { alignItems: 'center', marginBottom: 50 },
    logoCircle: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: '#00f2ff',
        shadowColor: "#00f2ff", shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8, shadowRadius: 15, elevation: 10, marginBottom: 20,
    },
    title: { fontSize: 32, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
    subtitle: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
    form: { width: '100%' },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12, marginBottom: 15, paddingHorizontal: 15,
        borderWidth: 1, borderColor: 'rgba(0, 242, 255, 0.2)',
    },
    icon: { marginRight: 10 },
    input: { flex: 1, height: 55, color: '#fff', fontSize: 16 },
    button: {
        height: 55, borderRadius: 12, overflow: 'hidden',
        shadowColor: "#00f2ff", shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4, shadowRadius: 10, elevation: 8, marginTop: 10
    },
    buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 2 },
});