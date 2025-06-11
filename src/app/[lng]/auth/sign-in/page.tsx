'use client';

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React from "react";
import { mockUsers } from "@/mock/users";

interface SignInPageProps {
    params: Promise<{ lng: string; }>;
}
export default function SignInPage({ params }: SignInPageProps) {
    const { lng } = React.use(params);
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        const { email, password } = data;

        const user = mockUsers.find((user) => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('session', JSON.stringify(user));
            router.push(`/${lng}/${user.tenant}/dashboard`);
        } else {
            alert('Invalid email or password');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow p-6 rounded space-y-4 w-80"
            >
                <h2 className="text-xl font-bold text-center">Iniciar sesión</h2>

                <input
                    type="email"
                    {...register('email', { required: true })}
                    className="border w-full p-2 rounded"
                    placeholder="Correo"
                />
                <input
                    type="password"
                    {...register('password', { required: true })}
                    className="border w-full p-2 rounded"
                    placeholder="Contraseña"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                    Ingresar
                </button>
            </form>
        </div>
    )
}
