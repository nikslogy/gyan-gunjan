"use client";

import { useState, useEffect } from "react";
import { Book, NotebookText } from "lucide-react";
import { Resources } from "@/components/resources";

export function JeevanResources({ selectedCategory = "Nature and Agriculture" }) {
  const [activeTab, setActiveTab] = useState("coffee");
  const [coffeeBooks, setCoffeeBooks] = useState([]);
  const [thematics, setThematics] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const jeevanResponse = await fetch("http://127.0.0.1:8000/api/jeevan-darshan/");
      
      if (!jeevanResponse.ok) {
        throw new Error("Failed to fetch Jeevan Darshan data");
      }

      const jeevanData = await jeevanResponse.json();
      const categoryData = jeevanData.find(item => item.title === selectedCategory);

      if (categoryData) {
        setCoffeeBooks(categoryData.coffee_table_book ? [categoryData.coffee_table_book] : []);
        setThematics(categoryData.thematic ? [categoryData.thematic] : []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    return activeTab === "coffee" 
      ? coffeeBooks
      : thematics;
  };

  const handleResourceSelect = (resource) => {
    const pdf = activeTab === "coffee" ? resource.book_pdf : resource.book_pdf;
    const title = activeTab === "coffee" ? resource.coffee_table_book_name : resource.name;
    
    setSelectedPdf(pdf || null);
    setSelectedTitle(pdf ? title : "PDF not available");

    setTimeout(() => {
      document.getElementById("resource-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    fetchInitialData();
  }, [selectedCategory]);

  useEffect(() => {
    const currentData = getCurrentData();
    currentData.length > 0 ? handleResourceSelect(currentData[0]) : setSelectedPdf(null);
  }, [selectedCategory, activeTab, coffeeBooks, thematics]);

  if (error) return <div className="text-red-500 p-4">Error loading resources: {error}</div>;
  if (loading) return <div className="p-4">Loading resources...</div>;

  const filteredData = getCurrentData();
  const hasContent = filteredData.length > 0 && filteredData[0].book_pdf;

  return (
    <div className="space-y-8 w-full overflow-x-auto">
      <div className="flex flex-wrap gap-2 bg-[#FAF3E0] p-1 rounded-custom2 w-fit">
        <button
          onClick={() => setActiveTab("coffee")}
          className={`px-6 py-3 rounded-custom2 transition-colors flex items-center gap-2 text-sm ${
            activeTab === "coffee" ? "bg-[#E4A853] text-black" : "text-gray-700 hover:bg-[#E4A853]"
          }`}
        >
          <Book className="w-4 h-4" />
          Coffee Table Books
        </button>

        <button
          onClick={() => setActiveTab("thematic")}
          className={`px-4 py-2 rounded-custom2 transition-colors flex items-center gap-2 text-sm ${
            activeTab === "thematic" ? "bg-[#E4A853] text-black" : "text-gray-700 hover:bg-[#E4A853]"
          }`}
        >
          <NotebookText className="w-4 h-4" />
          Thematic Concept Note
        </button>
      </div>

      {hasContent ? (
        <div className="w-full">
          <div id="resource-section">
            <Resources selectedPdf={selectedPdf} selectedTitle={selectedTitle} />
          </div>
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