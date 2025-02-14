"use client";

import { useState, useEffect } from "react";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ResourcesContent } from "@/components/resources-content";

export default function ResourcePage() {
    const [mounted, setMounted] = useState(false);
    const [initialCategory, setInitialCategory] = useState('Coffee Table Books');

    useEffect(() => {
        setMounted(true);
        const savedCategory = localStorage.getItem('selectedResourceType');
        if (savedCategory) {
            setInitialCategory(savedCategory);
            localStorage.removeItem('selectedResourceType');
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

    return (
        <div className="page-wrapper min-h-screen flex flex-col">
            <div className="navbar-wrapper">
                <NavBar />
            </div>
            <main className={`flex-grow content-wrapper bg-white transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
            }`}>
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