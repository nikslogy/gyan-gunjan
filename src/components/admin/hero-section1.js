"use client";

import { ChevronDown, Plus, X, Upload } from 'lucide-react';
import Image from "next/image";

export default function HeroSection1({ formData, setFormData }) {
  const handleImageUpload = async (section, index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const imageUrl = URL.createObjectURL(file);

        setFormData(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            sliderImages: prev[section].sliderImages.map((img, idx) =>
              idx === index ? { ...img, src: imageUrl, alt: file.name } : img
            )
          }
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    input.click();
  };

  const handleAddSliderImage = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        sliderImages: [...prev[section].sliderImages, { src: "", alt: "" }]
      }
    }));
  };

  const handleRemoveImage = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        sliderImages: prev[section].sliderImages.filter((_, idx) => idx !== index)
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-[#7A2631] mb-6">Hero Section 1</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            value={formData.heroSection1.heading}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              heroSection1: { ...prev.heroSection1, heading: e.target.value }
            }))}
            className="w-full px-4 py-2 border text-black rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.heroSection1.description}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              heroSection1: { ...prev.heroSection1, description: e.target.value }
            }))}
            rows={4}
            className="w-full px-4 py-2 text-black border rounded-md"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Slider Images
            </label>
            <button
              type="button"
              onClick={() => handleAddSliderImage('heroSection1')}
              className="flex items-center gap-2 px-4 py-2 bg-[#7A2631] text-white rounded-md hover:bg-[#9B2C2C]"
            >
              <Plus className="h-4 w-4" />
              Add Image
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.heroSection1.sliderImages.map((image, index) => (
              <div key={index} className="relative">
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
                        onChange={(e) => handleImageUpload('heroSection1', index)}
                        className="absolute inset-0 text-black opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage('heroSection1', index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}