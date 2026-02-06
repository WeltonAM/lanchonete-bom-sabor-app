import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextData {
    user: User | null;
    loading: boolean;
    loginMock: () => void; // Adicionado para desenvolvimento
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Dados do usuário fake
    const mockUser = {
        uid: '123-mock',
        email: 'admin@bomsabor.com',
        displayName: 'Admin Bom Sabor',
    } as User;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(prev => (prev?.uid === '123-mock' ? prev : null));
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loginMock = () => {
        setLoading(true);
        setTimeout(() => {
            setUser(mockUser);
            setLoading(false);
        }, 1000); // Simula atraso de rede
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginMock }}>
            {children}
        </AuthContext.Provider>
    );
}