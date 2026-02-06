import { useStorage } from '@/hooks/use-sessao.hook';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextData {
    user: User | null;
    loading: boolean;
    loginMock: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { saveUserStorage, getUserStorage, removeUserStorage } = useStorage();

    // Dados do usuário fake para desenvolvimento
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

            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
            });

            return unsubscribe;
        } catch (error) {
            console.error("Erro ao inicializar Auth:", error);
            setLoading(false);
        }
    }, [getUserStorage, saveUserStorage, removeUserStorage]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const loginMock = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUser(mockUser);
        await saveUserStorage(mockUser);
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        try {
            await auth.signOut();
        } catch (e) {
            console.log("Firebase SignOut ignorado" + e);
        } finally {
            await removeUserStorage();
            setUser(null);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginMock, logout }}>
            {children}
        </AuthContext.Provider>
    );
}