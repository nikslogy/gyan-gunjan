"use client";

import { Plus, X, Upload } from 'lucide-react';
import Image from "next/image";

export default function HeroSection3({ formData, setFormData }) {
  const handleImageUpload = async (section, index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const imageUrl = URL.createObjectURL(file);

        const newPatternImages = [...formData.heroSection3.patternImages];
        newPatternImages[index] = {
          ...newPatternImages[index],
          image: imageUrl
        };

        setFormData(prev => ({
          ...prev,
          heroSection3: {
            ...prev.heroSection3,
            patternImages: newPatternImages
          }
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    input.click();
  };

  const handleAddPatternImage = () => {
    const newPattern = {
      image: "",
      title: "",
      description: "",
      position: "absolute",
      shape: "rounded-custom",
      titleRotation: "rotate-0"
    };

    setFormData(prev => ({
      ...prev,
      heroSection3: {
        ...prev.heroSection3,
        patternImages: [...prev.heroSection3.patternImages, newPattern]
      }
    }));
  };

  const handleRemovePatternImage = (index) => {
    const newPatternImages = formData.heroSection3.patternImages.filter((_, idx) => idx !== index);

    setFormData(prev => ({
      ...prev,
      heroSection3: {
        ...prev.heroSection3,
        patternImages: newPatternImages
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-[#7A2631] mb-6">Hero Section 3</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            value={formData.heroSection3.heading}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              heroSection3: { ...prev.heroSection3, heading: e.target.value }
            }))}
            className="w-full px-4 py-2 border text-black rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.heroSection3.description}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              heroSection3: { ...prev.heroSection3, description: e.target.value }
            }))}
            rows={4}
            className="w-full px-4 py-2 border text-black rounded-md"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pattern Images
            </label>
            <button
              type="button"
              onClick={handleAddPatternImage}
              className="flex items-center gap-2 px-4 py-2 bg-[#7A2631] text-white rounded-md hover:bg-[#9B2C2C]"
            >
              <Plus className="h-4 w-4" />
              Add Pattern
            </button>
          </div>

          <div className="space-y-6">
            {formData.heroSection3.patternImages.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pattern Image
                    </label>
                    <div className="relative aspect-square">
                      <div className="aspect-square border rounded-lg overflow-hidden">
                        {pattern.image ? (
                          <Image
                            src={pattern.image}
                            alt={pattern.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center bg-gray-100">
                            <input
                              type="file"
                              onChange={(e) => handleImageUpload('heroSection3', index)}
                              className="absolute inset-0 text-black opacity-0 cursor-pointer"
                              accept="image/*"
                            />
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={pattern.title}
                        onChange={(e) => {
                          const newPatternImages = [...formData.heroSection3.patternImages];
                          newPatternImages[index] = {
                            ...pattern,
                            title: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            heroSection3: {
                              ...prev.heroSection3,
                              patternImages: newPatternImages
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border text-black rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={pattern.description}
                        onChange={(e) => {
                          const newPatternImages = [...formData.heroSection3.patternImages];
                          newPatternImages[index] = {
                            ...pattern,
                            description: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            heroSection3: {
                              ...prev.heroSection3,
                              patternImages: newPatternImages
                            }
                          }));
                        }}
                        rows={3}
                        className="w-full px-4 py-2 border text-black rounded-md"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={pattern.position}
                          onChange={(e) => {
                            const newPatternImages = [...formData.heroSection3.patternImages];
                            newPatternImages[index] = {
                              ...pattern,
                              position: e.target.value
                            };
                            setFormData(prev => ({
                              ...prev,
                              heroSection3: {
                                ...prev.heroSection3,
                                patternImages: newPatternImages
                              }
                            }));
                          }}
                          className="w-full px-4 py-2 text-black border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title Rotation
                        </label>
                        <input
                          type="text"
                          value={pattern.titleRotation}
                          onChange={(e) => {
                            const newPatternImages = [...formData.heroSection3.patternImages];
                            newPatternImages[index] = {
                              ...pattern,
                              titleRotation: e.target.value
                            };
                            setFormData(prev => ({
                              ...prev,
                              heroSection3: {
                                ...prev.heroSection3,
                                patternImages: newPatternImages
                              }
                            }));
                          }}
                          className="w-full px-4 py-2 border text-black rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemovePatternImage(index)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove Pattern
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}