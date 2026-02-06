import { useStorage } from '@/hooks/use-sessao.hook';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextData {
    user: User | null;
    loading: boolean;
    error: string | null;
    loginMock: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { saveUserStorage, getUserStorage, removeUserStorage } = useStorage();

    const mockUser = {
        uid: '123-mock',
        email: 'admin@bomsabor.com',
        displayName: 'Admin Bom Sabor',
    } as User;

    const initializeAuth = useCallback(async () => {
        try {
            const storedUser = await getUserStorage();
            if (storedUser) {
                setUser(storedUser);
            }

            const unsubscribe = onAuthStateChanged(auth,
                async (firebaseUser) => {
                    if (firebaseUser) {
                        setUser(firebaseUser);
                        await saveUserStorage(firebaseUser);
                    } else {
                        setUser((prev) => {
                            if (prev?.uid === '123-mock') return prev;
                            removeUserStorage();
                            return null;
                        });
                    }
                    setLoading(false);
                },
                (err) => {
                    console.log("Observador de Auth: Firebase não configurado (esperado se estiver usando mock).");
                    setLoading(false);
                }
            );

            return unsubscribe;
        } catch (err: any) {
            setError("Firebase offline. Use o login Mock.");
            setLoading(false);
        }
    }, [getUserStorage, saveUserStorage, removeUserStorage]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const loginMock = async () => {
        setLoading(true);
        // Pequeno delay para simular rede
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser(mockUser);
        await saveUserStorage(mockUser);
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        try {
            if (user?.uid !== '123-mock') {
                await auth.signOut();
            }
        } catch (e) {
            console.log("SignOut Firebase ignorado.");
        } finally {
            await removeUserStorage();
            setUser(null);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, loginMock, logout }}>
            {children}
        </AuthContext.Provider>
    );
}