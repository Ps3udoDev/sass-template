// src/app/store/hooks/usePurchase.ts

import { useUserStore } from '../userStore';
import { useUIStore } from '../uiStore';
import { getServiceById, getModuleById, getPackageById } from '@/modules/marketplaceConfig';

export const usePurchase = () => {
    const { purchaseModule, purchaseService, purchasePackage } = useUserStore();
    const {
        showPurchaseModal,
        showActivationModal,
        showSuccessModal,
        showErrorModal
    } = useUIStore();

    const handlePurchase = async (
        type: 'module' | 'service' | 'package',
        id: string,
        additionalData?: any
    ) => {
        try {
            let itemName = '';

            // Get item name based on type
            if (type === 'service') {
                const service = getServiceById(id);
                itemName = service?.name || id;
            } else if (type === 'module') {
                const module = getModuleById(id);
                itemName = module?.name || id;
            } else if (type === 'package') {
                const pkg = getPackageById(id);
                itemName = pkg?.name || id;
            }

            // Show purchase modal
            showPurchaseModal(itemName);

            // Simulate purchase delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show activation modal
            showActivationModal(itemName);

            // Simulate activation delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Update store based on type
            if (type === 'service') {
                purchaseService(id);
            } else if (type === 'module') {
                purchaseModule(id);
            } else if (type === 'package') {
                purchasePackage(id);
            }

            // Show success modal
            showSuccessModal(
                '¡Compra exitosa!',
                `${itemName} ha sido activado y ya está disponible en tu cuenta`
            );

            // Force sidebar refresh after a delay to show new services
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            return { success: true, message: 'Compra realizada exitosamente' };

        } catch (error) {
            showErrorModal(
                'Error en la compra',
                'Ocurrió un problema al procesar tu compra. Intenta nuevamente.'
            );

            return { success: false, message: 'Error al procesar la compra' };
        }
    };

    return {
        handlePurchase
    };
};
