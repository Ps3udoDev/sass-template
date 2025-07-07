'use client';

import { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface ActivationModalProps {
    isOpen: boolean;
    serviceName: string;
    onClose: () => void;
}

export default function ActivationModal({ isOpen, serviceName, onClose }: ActivationModalProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setStep(0);
            const timer1 = setTimeout(() => setStep(1), 500);
            const timer2 = setTimeout(() => setStep(2), 1500);
            const timer3 = setTimeout(() => onClose(), 3000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl p-8 max-w-md mx-4 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step >= 2 ? (
                        <Check size={32} className="text-success" />
                    ) : (
                        <Sparkles size={32} className="text-primary animate-pulse" />
                    )}
                </div>

                <h3 className="text-xl font-bold text-primary mb-2">
                    {step === 0 && "Procesando compra..."}
                    {step === 1 && "Activando servicio..."}
                    {step >= 2 && "¡Servicio activado!"}
                </h3>

                <p className="text-secondary">
                    {step < 2 ? `Configurando ${serviceName}` : `${serviceName} ya está disponible en tu sidebar`}
                </p>

                {step >= 2 && (
                    <div className="mt-4 p-3 bg-success-light rounded-lg">
                        <p className="text-sm text-success">
                            El servicio aparecerá en tu menú lateral en unos segundos
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
