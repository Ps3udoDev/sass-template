'use client';

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { mockUsers } from "@/mock/users";

interface SignInFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

interface SignInPageProps {
    params: Promise<{ lng: string; }>;
}

export default function SignInPage({ params }: SignInPageProps) {
    const { lng } = React.use(params);
    const router = useRouter();
    const t = useTranslations('login');

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInFormData>();

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Simular delay de autenticación
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { email, password } = data;
            const user = mockUsers.find((user) => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('session', JSON.stringify(user));
                router.push(`/${lng}/${user.tenant}/dashboard`);
            } else {
                setError(t('errors.invalidCredentials'));
            }
        } catch (err) {
            setError(t('errors.serverError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-surface">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            {t('welcome')}
                        </h1>
                        <p className="text-secondary">
                            {t('description')}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-error-light border border-error/20 rounded-lg">
                            <p className="text-error text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                {t('email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-muted" />
                                </div>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: t('errors.emailRequired'),
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: t('errors.emailInvalid')
                                        }
                                    })}
                                    className={`
                                        w-full pl-10 pr-4 py-3 border rounded-lg
                                        bg-surface-secondary focus:bg-background
                                        border-default focus:border-primary
                                        text-primary placeholder:text-muted
                                        focus:outline-none focus-ring
                                        transition-all duration-200
                                        ${errors.email ? 'border-error focus:border-error' : ''}
                                    `}
                                    placeholder={t('emailPlaceholder')}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                {t('password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-muted" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', {
                                        required: t('errors.passwordRequired'),
                                        minLength: {
                                            value: 6,
                                            message: t('errors.passwordMin')
                                        }
                                    })}
                                    className={`
                                        w-full pl-10 pr-12 py-3 border rounded-lg
                                        bg-surface-secondary focus:bg-background
                                        border-default focus:border-primary
                                        text-primary placeholder:text-muted
                                        focus:outline-none focus-ring
                                        transition-all duration-200
                                        ${errors.password ? 'border-error focus:border-error' : ''}
                                    `}
                                    placeholder={t('passwordPlaceholder')}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-primary transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('rememberMe')}
                                    className="h-4 w-4 text-primary border-default rounded focus-ring"
                                    disabled={isLoading}
                                />
                                <span className="ml-2 text-sm text-secondary">
                                    {t('rememberMe')}
                                </span>
                            </label>

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3 text-lg font-semibold group flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t('submitting')}
                                </>
                            ) : (
                                <>
                                    {t('submit')}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                </div>
            </div>

            {/* Right Column - Glass Effect with Logo */}
            <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 0%, transparent 50%),
                                             radial-gradient(circle at 75% 75%, var(--color-accent) 0%, transparent 50%)`,
                            filter: 'blur(100px)'
                        }}
                    />
                </div>

                {/* Glass Card */}
                <div className="flex items-center justify-center h-full p-8">
                    <div className="glass-effect rounded-3xl p-12 max-w-md w-full text-center">
                        {/* Logo */}
                        <div className="mb-8">
                            <div className="logo-glow mx-auto">
                                <Image
                                    alt="Quanta Innovation Lab"
                                    src='/logos/Quanta.png'
                                    width={150}
                                    height={150}
                                    className='rounded-full object-cover mx-auto'
                                    priority
                                />
                            </div>
                        </div>

                        {/* Brand Message */}
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Quanta Innovation Lab
                        </h2>

                        <p className="text-lg text-secondary mb-6 leading-relaxed">
                            {t('brandMessage')}
                        </p>

                        <p className="text-sm text-muted opacity-75">
                            {t('brandSubtitle')}
                        </p>

                        {/* Floating Elements */}
                        <div className="absolute top-10 right-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
                        <div className="absolute bottom-10 left-10 w-6 h-6 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 left-8 w-3 h-3 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
