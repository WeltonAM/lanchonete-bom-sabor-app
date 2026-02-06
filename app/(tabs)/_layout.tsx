import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#00f2ff',
                tabBarInactiveTintColor: '#64748b',
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopColor: '#1e293b',
                    borderTopWidth: 1,
                    height: Platform.OS === 'android' ? 70 : 88,
                    paddingBottom: Platform.OS === 'android' ? 20 : 30,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="venda"
                options={{
                    title: 'Venda',
                    tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="produtos"
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color }) => <Ionicons name="fast-food-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="estoque"
                options={{
                    title: 'Estoque',
                    tabBarIcon: ({ color }) => <Ionicons name="cube-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="relatorios"
                options={{
                    title: 'Relatórios',
                    tabBarIcon: ({ color }) => <Ionicons name="bar-chart-outline" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}