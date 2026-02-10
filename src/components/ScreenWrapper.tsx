import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    isScrollable?: boolean;
    onAddPress?: () => void;
}

export function ScreenWrapper({ title, subtitle, children, isScrollable = true, onAddPress }: Props) {
    const ContentWrapper = isScrollable ? ScrollView : View;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#0f172a', '#000']} style={styles.background} />

            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
                {onAddPress && (
                    <TouchableOpacity style={styles.addButton} onPress={onAddPress} activeOpacity={0.7}>
                        <Ionicons name="add" size={28} color="#000" />
                    </TouchableOpacity>
                )}
            </View>

            <ContentWrapper
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={isScrollable ? { paddingBottom: 100 } : { flex: 1 }}
            >
                {children}
            </ContentWrapper>
        </View>
    );
}

export const commonStyles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 18,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    searchInput: { flex: 1, color: '#fff', marginLeft: 10, fontSize: 16 },
    miniCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 14,
        color: '#fff',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
});

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    background: { ...StyleSheet.absoluteFillObject },
    header: { paddingHorizontal: 25, paddingTop: 60, paddingBottom: 20, flexDirection: 'row', alignItems: 'center' },
    title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
    subtitle: { color: '#64748b', fontSize: 14 },
    addButton: {
        backgroundColor: '#00f2ff',
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#00f2ff',
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
});