import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  useEffect(() => {
    async function configureDesign() {
      if (Platform.OS === 'android') {
        await NavigationBar.setBackgroundColorAsync('#000000');
        await NavigationBar.setButtonStyleAsync('light');
      }
    }
    configureDesign();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar style="light" translucent={false} backgroundColor="#000" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}