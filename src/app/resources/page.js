"use client";

import { useState, useEffect, Suspense } from "react";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ResourcesContent } from "@/components/resources-content";
import dynamic from 'next/dynamic';
import { API_BASE_URL } from '@/utils/api';

// Create a dynamic component for PDF initialization
const PdfInitializer = dynamic(() => import('@/components/pdf-initializer'), {
  ssr: false
});

export default function ResourcePage() {
    const [mounted, setMounted] = useState(false);
    const [initialCategory, setInitialCategory] = useState('Thematic Essays');



    useEffect(() => {
        setMounted(true);

        // Handle local storage
        if (typeof window !== 'undefined') {
            const savedCategory = localStorage.getItem('selectedResourceType');
            if (savedCategory) {
                setInitialCategory(savedCategory);
                localStorage.removeItem('selectedResourceType');
            }
        }

        // Listen for category changes from navbar
        const handleCategoryChange = (event) => {
            setInitialCategory(event.detail);
        };

        window.addEventListener('resourceCategoryChange', handleCategoryChange);
        return () => {
            window.removeEventListener('resourceCategoryChange', handleCategoryChange);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="page-wrapper">
            <div className="navbar-wrapper">
                <NavBar />
            </div>
            <main className={`content-wrapper bg-white transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
            }`}>
                <Suspense fallback={null}>
                    <PdfInitializer />
                </Suspense>
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <ResourcesContent initialCategory={initialCategory} />
                </div>
            </main>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}