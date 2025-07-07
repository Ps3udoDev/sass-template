// src/app/store/userStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '@/mock/users';
import { UserStore, User } from './types/store.types';

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isHydrated: false, // ✅ AGREGAR

            // ✅ AGREGAR función para marcar como hidratado
            setHydrated: () => set({ isHydrated: true }),

            login: async (email: string, password: string): Promise<boolean> => {
                console.log(email, password)
                set({ isLoading: true });

                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const user = mockUsers.find((user) =>
                        user.email === email && user.password === password
                    );

                    if (user) {
                        set({
                            user,
                            isAuthenticated: true,
                            isLoading: false
                        });
                        return true;
                    } else {
                        set({ isLoading: false });
                        return false;
                    }
                } catch (error) {
                    set({ isLoading: false });
                    return false;
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false
                });
            },

            updateUser: (updates: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...updates }
                    });
                }
            },

            purchaseModule: (moduleId: string) => {
                const currentUser = get().user;
                if (currentUser) {
                    const updatedModules = [...currentUser.ownedModules, moduleId];
                    set({
                        user: {
                            ...currentUser,
                            ownedModules: updatedModules
                        }
                    });
                }
            },

            purchaseService: (serviceId: string) => {
                const currentUser = get().user;
                if (currentUser) {
                    const updatedServices = [...currentUser.ownedServices, serviceId];
                    set({
                        user: {
                            ...currentUser,
                            ownedServices: updatedServices
                        }
                    });
                }
            },

            purchasePackage: (packageId: string) => {
                const currentUser = get().user;
                if (currentUser) {
                    const updatedPackages = [...currentUser.ownedPackages, packageId];
                    set({
                        user: {
                            ...currentUser,
                            ownedPackages: updatedPackages
                        }
                    });
                }
            },

            initializeFromStorage: () => {
                if (typeof window !== 'undefined') {
                    const session = localStorage.getItem('session');
                    if (session) {
                        try {
                            const userData = JSON.parse(session) as User;
                            set({
                                user: userData,
                                isAuthenticated: true
                            });
                            localStorage.removeItem('session');
                        } catch (error) {
                            console.error('Error parsing session:', error);
                        }
                    }
                }
            }
        }),
        {
            name: 'user-store',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
            // ✅ AGREGAR callback de hidratación
            onRehydrateStorage: () => (state) => {
                // Marcar como hidratado cuando termine de cargar
                state?.setHydrated?.();
            }
        }
    )
);
