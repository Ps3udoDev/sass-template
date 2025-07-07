// src/app/store/types/store.types.ts

export interface User {
    email: string;
    password: string;
    tenant: string;
    ownedModules: string[];
    ownedServices: string[];
    ownedPackages: string[];
    subscription: Subscription;
}

export interface Subscription {
    plan: string;
    nextBilling: string;
    amount: number;
    currency: string;
}

// Agregar a UserStore interface:
export interface UserStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isHydrated: boolean; // ✅ AGREGAR

    // Actions
    setHydrated: () => void; // ✅ AGREGAR
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    purchaseModule: (moduleId: string) => void;
    purchaseService: (serviceId: string) => void;
    purchasePackage: (packageId: string) => void;
    initializeFromStorage: () => void;
}

export interface NotificationModal {
    id: string;
    type: 'purchase' | 'activation' | 'success' | 'error';
    title: string;
    message: string;
    serviceName?: string;
    isVisible: boolean;
    autoClose?: boolean;
    duration?: number;
}

export interface UIStore {
    // Modals
    activeModal: NotificationModal | null;

    // Loading states
    isPurchasing: boolean;
    isActivating: boolean;

    // Sidebar
    sidebarCollapsed: boolean;

    // Actions
    showPurchaseModal: (serviceName: string) => void;
    showActivationModal: (serviceName: string) => void;
    showSuccessModal: (title: string, message: string) => void;
    showErrorModal: (title: string, message: string) => void;
    hideModal: () => void;

    setPurchasing: (loading: boolean) => void;
    setActivating: (loading: boolean) => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
}

export interface PurchaseResult {
    success: boolean;
    message: string;
    itemId: string;
    itemName: string;
}
