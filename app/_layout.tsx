import { AuthProvider } from '@/contexts/auth.context';
import { useAuth } from '@/hooks/use-auth.hook';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      router.replace('/login');
    } else if (user && !inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#00f2ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    async function configureDesign() {
      if (Platform.OS === 'android') {
        await NavigationBar.setPositionAsync('absolute');
        await NavigationBar.setBackgroundColorAsync('#00000000');
        await NavigationBar.setButtonStyleAsync('dark');
      }
    }
    configureDesign();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000' }}>
      <AuthProvider>
        <StatusBar style="light" translucent={true} backgroundColor="transparent" />
        <InitialLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}