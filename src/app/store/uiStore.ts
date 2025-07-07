// src/app/store/uiStore.ts

import { create } from 'zustand';
import { UIStore, NotificationModal } from './types/store.types';

export const useUIStore = create<UIStore>((set, get) => ({
    // Modal state
    activeModal: null,

    // Loading states
    isPurchasing: false,
    isActivating: false,

    // Sidebar state
    sidebarCollapsed: false,

    // Show purchase modal
    showPurchaseModal: (serviceName: string) => {
        const modal: NotificationModal = {
            id: `purchase-${Date.now()}`,
            type: 'purchase',
            title: 'Procesando compra...',
            message: `Configurando ${serviceName}`,
            serviceName,
            isVisible: true,
            autoClose: false
        };

        set({
            activeModal: modal,
            isPurchasing: true
        });
    },

    // Show activation modal
    showActivationModal: (serviceName: string) => {
        const modal: NotificationModal = {
            id: `activation-${Date.now()}`,
            type: 'activation',
            title: 'Activando servicio...',
            message: `${serviceName} se está configurando`,
            serviceName,
            isVisible: true,
            autoClose: false
        };

        set({
            activeModal: modal,
            isActivating: true
        });
    },

    // Show success modal
    showSuccessModal: (title: string, message: string) => {
        const modal: NotificationModal = {
            id: `success-${Date.now()}`,
            type: 'success',
            title,
            message,
            isVisible: true,
            autoClose: true,
            duration: 3000
        };

        set({
            activeModal: modal,
            isPurchasing: false,
            isActivating: false
        });

        // Auto-close after duration
        setTimeout(() => {
            get().hideModal();
        }, modal.duration);
    },

    // Show error modal
    showErrorModal: (title: string, message: string) => {
        const modal: NotificationModal = {
            id: `error-${Date.now()}`,
            type: 'error',
            title,
            message,
            isVisible: true,
            autoClose: true,
            duration: 4000
        };

        set({
            activeModal: modal,
            isPurchasing: false,
            isActivating: false
        });

        // Auto-close after duration
        setTimeout(() => {
            get().hideModal();
        }, modal.duration);
    },

    // Hide modal
    hideModal: () => {
        set({
            activeModal: null,
            isPurchasing: false,
            isActivating: false
        });
    },

    // Set purchasing state
    setPurchasing: (loading: boolean) => {
        set({ isPurchasing: loading });
    },

    // Set activating state
    setActivating: (loading: boolean) => {
        set({ isActivating: loading });
    },

    // Set sidebar collapsed state
    setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
    }
}))
