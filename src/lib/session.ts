// src/lib/session.ts

import { useUserStore } from "@/app/store/userStore";


export const getSession = () => {
    // En cliente, usar Zustand store
    if (typeof window !== 'undefined') {
        const store = useUserStore.getState();
        return store.isAuthenticated ? store.user : null;
    }
    return null;
};

// Función helper para verificar si está autenticado
export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        const store = useUserStore.getState();
        return store.isAuthenticated && !!store.user;
    }
    return false;
};

// Función helper para obtener el usuario actual
export const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const store = useUserStore.getState();
        return store.isAuthenticated ? store.user : null;
    }
    return null;
};
