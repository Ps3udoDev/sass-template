'use client';

import Link from 'next/link';

interface HeaderProps {
    lng: string;
}

export default function Header({ lng }: HeaderProps) {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <header className='fixed top-0 w-full px-6 py-4 shadow bg-white/95 backdrop-blur-sm z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <Link href={`/${lng}`} className="text-xl font-bold text-blue-700">
                    MiSaaS
                </Link>

                <nav className="flex items-center space-x-6">
                    <button
                        onClick={() => scrollToSection('home')}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => scrollToSection('products')}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        Products
                    </button>
                    <Link href={`/${lng}/auth/sign-in`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}
