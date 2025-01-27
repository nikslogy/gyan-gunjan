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
            // Optional: Clear the stored value after using it
            localStorage.removeItem('selectedResourceType');
        }
    }, []);

    return (
        <main className={`min-h-screen bg-white transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
            <NavBar />
            <div className="container mx-auto px-4 md:px-6 py-12">
                <ResourcesContent initialCategory={initialCategory} />
            </div>
            <Footer />
        </main>
    );
}