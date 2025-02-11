"use client";

import { useState, useEffect } from "react";
import { Book, BookImage, NotebookText } from "lucide-react";
import Image from "next/image";
import { Resources } from "@/components/resources";

export function JeevanResources({ selectedCategory = 'Nature & Agriculture' }) {
    const [activeTab, setActiveTab] = useState('coffee');
    const [coffeeBooks, setCoffeeBooks] = useState([]);
    const [thematics, setThematics] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        const filteredData = getCurrentData();
        if (filteredData.length > 0) {
            handleBookSelect(filteredData[0]);
        } else {
            // Reset PDF viewer if no books are found
            setSelectedPdf(null);
            setSelectedTitle('');
        }
    }, [selectedCategory, activeTab]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [coffeeRes, thematicRes] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/coffee-table-books/'),
                fetch('http://127.0.0.1:8000/api/thematic/')
            ]);
            
            setCoffeeBooks(await coffeeRes.json());
            setThematics(await thematicRes.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBookSelect = (resource) => {
        const pdfUrl = resource.file || resource.book_pdf || resource.cover_image;
        const title = resource.title || resource.name || resource.coffee_table_book_name;
        
        setSelectedPdf(pdfUrl);
        setSelectedTitle(title);

        setTimeout(() => {
            const element = document.getElementById('flipbook-wrapper');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const getCurrentData = () => {
        const data = activeTab === 'coffee' ? coffeeBooks : thematics;
        return data.filter(item => {
            const category = item.category?.toLowerCase() || '';
            return category.includes(selectedCategory.toLowerCase());
        });
    };

    if (error) return <div className="text-red-500 p-4">Error loading resources: {error}</div>;
    if (loading) return <div className="p-4">Loading resources...</div>;

    const hasContent = getCurrentData().length > 0;

    return (
        <div className="space-y-8 w-full overflow-x-auto">
            {/* Tab navigation */}
            <div className="flex flex-wrap gap-2 bg-[#FAF3E0] p-1 rounded-custom2 w-fit">
                <button
                    onClick={() => setActiveTab('coffee')}
                    className={`px-6 py-3 rounded-custom2 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap ${
                        activeTab === 'coffee' 
                            ? 'bg-[#E4A853] text-black' 
                            : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
                    }`}
                >
                    <Book className="w-4 h-4" />
                    Coffee Table Books
                </button>

                <button
                    onClick={() => setActiveTab('thematic')}
                    className={`px-4 py-2 rounded-custom2 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap ${
                        activeTab === 'thematic' 
                            ? 'bg-[#E4A853] text-black' 
                            : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
                    }`}
                >
                    <NotebookText className="w-4 h-4" />
                    Thematic Concept Note
                </button>
            </div>

            {hasContent ? (
                <div className="w-full">
                    <Resources selectedPdf={selectedPdf} selectedTitle={selectedTitle} />
                </div>
            ) : (
                <div className="text-center py-12 w-full">
                    <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                        <Book className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Resources Coming Soon
                        </h3>
                        <p className="text-gray-600 mb-4">
                            We are currently preparing resources for {selectedCategory}. Meanwhile, if you have valuable knowledge to share in this area, we'd love to hear from you!
                        </p>
                        <a 
                            href="/lets-collaborate" 
                            className="inline-block px-6 py-3 bg-[#E4A853] text-black rounded-custom2 hover:bg-[#F6B352] transition-colors"
                        >
                            Share Your Knowledge →
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}