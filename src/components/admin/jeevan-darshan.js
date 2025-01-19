"use client";

import { Plus, X, Upload } from 'lucide-react';
import Image from "next/image";

export default function JeevanDarshan({ formData, setFormData }) {
  const handleImageUpload = async (section, index, categoryIndex) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const imageUrl = URL.createObjectURL(file);

        const newCategories = [...formData.jeevanDarshan.categories];
        newCategories[categoryIndex] = {
          ...newCategories[categoryIndex],
          images: newCategories[categoryIndex].images.map((img, idx) =>
            idx === index ? { ...img, src: imageUrl, alt: file.name } : img
          )
        };

        setFormData(prev => ({
          ...prev,
          jeevanDarshan: {
            ...prev.jeevanDarshan,
            categories: newCategories
          }
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    input.click();
  };

  const handleAddCategory = () => {
    const newCategory = {
      name: 'New Category',
      description1: '',
      description2: '',
      images: []
    };

    setFormData(prev => ({
      ...prev,
      jeevanDarshan: {
        ...prev.jeevanDarshan,
        categories: [...prev.jeevanDarshan.categories, newCategory]
      }
    }));
  };

  const handleRemoveCategory = (index) => {
    const newCategories = formData.jeevanDarshan.categories.filter((_, idx) => idx !== index);

    setFormData(prev => ({
      ...prev,
      jeevanDarshan: {
        ...prev.jeevanDarshan,
        categories: newCategories
      }
    }));
  };

  const handleAddImage = (categoryIndex) => {
    const newCategories = [...formData.jeevanDarshan.categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      images: [...newCategories[categoryIndex].images, { src: "", alt: "" }]
    };

    setFormData(prev => ({
      ...prev,
      jeevanDarshan: {
        ...prev.jeevanDarshan,
        categories: newCategories
      }
    }));
  };

  const handleRemoveImage = (categoryIndex, imageIndex) => {
    const newCategories = [...formData.jeevanDarshan.categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      images: newCategories[categoryIndex].images.filter((_, idx) => idx !== imageIndex)
    };

    setFormData(prev => ({
      ...prev,
      jeevanDarshan: {
        ...prev.jeevanDarshan,
        categories: newCategories
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#7A2631]">Jeevan Darshan Categories</h2>
        <button
          type="button"
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-[#7A2631] text-white rounded-md hover:bg-[#9B2C2C]"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-8">
        {formData.jeevanDarshan.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={category.name}
                onChange={(e) => {
                  const newCategories = [...formData.jeevanDarshan.categories];
                  newCategories[categoryIndex] = {
                    ...category,
                    name: e.target.value
                  };
                  setFormData(prev => ({
                    ...prev,
                    jeevanDarshan: {
                      ...prev.jeevanDarshan,
                      categories: newCategories
                    }
                  }));
                }}
                className="w-full px-4 py-2 text-black border rounded-md"
                placeholder="Category Name"
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(categoryIndex)}
                className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description 1
                </label>
                <textarea
                  value={category.description1}
                  onChange={(e) => {
                    const newCategories = [...formData.jeevanDarshan.categories];
                    newCategories[categoryIndex] = {
                      ...category,
                      description1: e.target.value
                    };
                    setFormData(prev => ({
                      ...prev,
                      jeevanDarshan: {
                        ...prev.jeevanDarshan,
                        categories: newCategories
                      }
                    }));
                  }}
                  rows={4}
                  className="w-full px-4 py-2 text-black border rounded-md"
                  placeholder="Enter first description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description 2
                </label>
                <textarea
                  value={category.description2}
                  onChange={(e) => {
                    const newCategories = [...formData.jeevanDarshan.categories];
                    newCategories[categoryIndex] = {
                      ...category,
                      description2: e.target.value
                    };
                    setFormData(prev => ({
                      ...prev,
                      jeevanDarshan: {
                        ...prev.jeevanDarshan,
                        categories: newCategories
                      }
                    }));
                  }}
                  rows={4}
                  className="w-full px-4 py-2 text-black border rounded-md"
                  placeholder="Enter second description"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="relative">
                    <div className="aspect-square border rounded-lg overflow-hidden">
                      {image.src ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center bg-gray-100">
                          <input
                            type="file"
                            onChange={(e) => handleImageUpload('jeevanDarshan', imageIndex, categoryIndex)}
                            className="absolute inset-0 text-black opacity-0 cursor-pointer"
                            accept="image/*"
                          />
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(categoryIndex, imageIndex)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddImage(categoryIndex)}
                  className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="h-8 w-8 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}