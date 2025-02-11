"use client";

import { useState, useEffect } from "react";
import { Book, NotebookText } from "lucide-react";
import { Resources } from "@/components/resources";

export function JeevanResources({ selectedCategory = "Nature and Agriculture" }) {
  const [activeTab, setActiveTab] = useState("coffee"); // "coffee" or "thematic"
  const [coffeeBooks, setCoffeeBooks] = useState([]);
  const [thematics, setThematics] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch both Coffee Table Books and Thematic data from the API
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const coffeeResponse = await fetch(
        `http://127.0.0.1:8000/api/coffee-table-books/?coffee_table_book_name=${selectedCategory}`
      );
      const thematicResponse = await fetch(
        `http://127.0.0.1:8000/api/thematic/?name=${selectedCategory}`
      );

      if (!coffeeResponse.ok || !thematicResponse.ok) {
        throw new Error("Failed to fetch resource data");
      }

      const coffeeData = await coffeeResponse.json();
      const thematicData = await thematicResponse.json();

      setCoffeeBooks(coffeeData);
      setThematics(thematicData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on selected category and active tab
  const getCurrentData = () => {
    if (activeTab === "coffee") {
      return coffeeBooks.filter((item) =>
        item.coffee_table_book_name
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
      );
    } else {
      return thematics.filter((item) =>
        item.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
  };

  // When a resource is selected, update the PDF (if any) and title.
  const handleResourceSelect = (resource) => {
    if (activeTab === "coffee") {
      // Use the book_pdf_url from the API response
      setSelectedPdf(resource.book_pdf);
      setSelectedTitle(resource.coffee_table_book_name);
    }
    else {
      // For thematic items, no PDF is available.
      setSelectedPdf(null);
      setSelectedTitle(resource.name);
    }
    // Scroll into view if desired
    setTimeout(() => {
      const element = document.getElementById("resource-section");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Fetch data when the component mounts or when selectedCategory changes
  useEffect(() => {
    fetchInitialData();
  }, [selectedCategory]);

  // Update the selected resource when the active tab or data changes
  useEffect(() => {
    const currentData = getCurrentData();
    if (currentData.length > 0) {
      handleResourceSelect(currentData[0]);
    } else {
      setSelectedPdf(null);
      setSelectedTitle("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, activeTab, coffeeBooks, thematics]);

  if (error)
    return (
      <div className="text-red-500 p-4">
        Error loading resources: {error}
      </div>
    );
  if (loading) return <div className="p-4">Loading resources...</div>;

  const filteredData = getCurrentData();
  const hasContent = filteredData.length > 0;

  return (
    <div className="space-y-8 w-full overflow-x-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-[#FAF3E0] p-1 rounded-custom2 w-fit">
        <button
          onClick={() => setActiveTab("coffee")}
          className={`px-6 py-3 rounded-custom2 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap ${
            activeTab === "coffee"
              ? "bg-[#E4A853] text-black"
              : "text-gray-700 hover:bg-[#E4A853] hover:text-black"
          }`}
        >
          <Book className="w-4 h-4" />
          Coffee Table Books
        </button>

        <button
          onClick={() => setActiveTab("thematic")}
          className={`px-4 py-2 rounded-custom2 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap ${
            activeTab === "thematic"
              ? "bg-[#E4A853] text-black"
              : "text-gray-700 hover:bg-[#E4A853] hover:text-black"
          }`}
        >
          <NotebookText className="w-4 h-4" />
          Thematic Concept Note
        </button>
      </div>

      {hasContent ? (
        <div className="w-full">
          {activeTab === "coffee" ? (
            // Display the Resources component for Coffee Table Books
            <div id="resource-section">
              <Resources
                selectedPdf={selectedPdf}
                selectedTitle={selectedTitle}
              />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredData.map((book) => (
                  <div
                    key={book.coffee_table_book_name}
                    onClick={() => handleResourceSelect(book)}
                    className={`cursor-pointer p-4 rounded-lg shadow border ${
                      selectedTitle === book.coffee_table_book_name
                        ? "border-[#E4A853]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={book.cover_image}
                      alt={book.coffee_table_book_name}
                      className="rounded-lg mb-2 w-full h-48 object-cover"
                    />
                    <h3 className="text-lg font-semibold">
                      {book.coffee_table_book_name}
                    </h3>
                    <p className="text-gray-600">{book.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Display a grid of Thematic cards
            <div id="resource-section">
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredData.map((theme) => (
                  <div
                    key={theme.name}
                    onClick={() => handleResourceSelect(theme)}
                    className={`cursor-pointer p-4 rounded-lg shadow border ${
                      selectedTitle === theme.name
                        ? "border-[#E4A853]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={theme.cover_picture}
                      alt={theme.name}
                      className="rounded-lg mb-2 w-full h-48 object-cover"
                    />
                    <h3 className="text-lg font-semibold">{theme.name}</h3>
                    <p className="text-gray-600">{theme.headline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 w-full">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <Book className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600">
              Resources for {selectedCategory} are currently being prepared.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
