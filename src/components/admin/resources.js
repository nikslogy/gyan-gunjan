"use client";

import { Plus, X, Upload } from 'lucide-react';
import Image from "next/image";
import { useState } from 'react';

export default function Resources({ formData, setFormData }) {
  const [newCategory, setNewCategory] = useState('');
  const [selectedResourceCategory, setSelectedResourceCategory] = useState('');
  const [newState, setNewState] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        categories: [...prev.resources.categories, newCategory.trim()],
        items: {
          ...prev.resources.items,
          [newCategory.trim()]: []
        }
      }
    }));
    setNewCategory('');
  };

  const handleResourceUpload = async (file, coverImage, youtubeLink) => {
    if (!file && !youtubeLink) return;

    try {
      const fileUrl = file ? URL.createObjectURL(file) : null;
      const newResource = {
        title: file ? file.name : 'YouTube Video',
        file: fileUrl,
        image: coverImage,
        youtubeLink: youtubeLink || null,
      };

      if (selectedResourceCategory === 'Regional Flip Books') {
        if (!selectedState || !selectedRegion) {
          alert('Please select a state and region first');
          return;
        }

        setFormData(prev => ({
          ...prev,
          resources: {
            ...prev.resources,
            items: {
              ...prev.resources.items,
              [selectedResourceCategory]: {
                ...prev.resources.items[selectedResourceCategory] || {},
                [selectedState]: {
                  ...(prev.resources.items[selectedResourceCategory]?.[selectedState] || {}),
                  [selectedRegion]: [
                    ...(prev.resources.items[selectedResourceCategory]?.[selectedState]?.[selectedRegion] || []),
                    newResource
                  ]
                }
              }
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          resources: {
            ...prev.resources,
            items: {
              ...prev.resources.items,
              [selectedResourceCategory]: [
                ...(Array.isArray(prev.resources.items[selectedResourceCategory]) 
                  ? prev.resources.items[selectedResourceCategory] 
                  : []
                ),
                newResource
              ]
            }
          }
        }));
      }
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Failed to upload resource');
    }
  };

  const handleResourceTitleChange = (category, index, newTitle) => {
    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        items: {
          ...prev.resources.items,
          [category]: prev.resources.items[category].map((item, i) =>
            i === index ? { ...item, title: newTitle } : item
          )
        }
      }
    }));
  };

  const handleRemoveResource = (category, index) => {
    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        items: {
          ...prev.resources.items,
          [category]: prev.resources.items[category].filter((_, i) => i !== index)
        }
      }
    }));
  };

  const handleAddState = () => {
    if (!newState.trim()) return;

    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        states: [...prev.resources.states, newState.trim()],
        regions: {
          ...prev.resources.regions,
          [newState.trim()]: []
        }
      }
    }));
    setNewState('');
  };

  const handleAddRegion = () => {
    if (!newRegion.trim()) return;

    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        regions: {
          ...prev.resources.regions,
          [selectedState]: [...(prev.resources.regions[selectedState] || []), newRegion.trim()]
        }
      }
    }));
    setNewRegion('');
  };

  const handleCoverImageUpload = (file) => {
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setCoverImage(fileUrl);
  };

  const ResourceItem = ({ item, onRemove, onTitleChange }) => (
    <div className="border rounded-lg p-4">
      <div className="aspect-square relative mb-2">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={item.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-3 py-1 border text-black rounded-md text-sm"
          placeholder="Resource title"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {item.file ? 'File uploaded' : 'No file'}
          </span>
          <button
            onClick={onRemove}
            className="p-1 text-red-500 hover:bg-red-50 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-custom2 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-[#7A2631] mb-6">Resources</h2>
      
      <div className="space-y-8">
        {/* States and Regions Management */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage States and Regions</h3>
          
          {/* Add State */}
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add New State
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  className="flex-1 px-4 py-2 text-black border rounded-md"
                  placeholder="Enter state name"
                />
                <button
                  type="button"
                  onClick={handleAddState}
                  className="px-4 py-2 bg-[#7A2631] text-white rounded-md hover:bg-[#9B2C2C]"
                >
                  Add State
                </button>
              </div>
            </div>
          </div>

          {/* Add Region */}
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add New Region
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="flex-1 px-4 py-2 border text-black rounded-md"
                >
                  <option value="">Select a state</option>
                  {formData.resources.states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="flex-1 px-4 py-2 text-black border rounded-md"
                  placeholder="Enter region name"
                />
                <button
                  type="button"
                  onClick={handleAddRegion}
                  className="px-4 py-2 bg-[#7A2631] text-white rounded-md hover:bg-[#9B2C2C]"
                  disabled={!selectedState}
                >
                  Add Region
                </button>
              </div>
            </div>
          </div>

          {/* Display States and Regions */}
          <div className="mt-4">
            <h4 className="font-medium mb-2 text-black">States and Their Regions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.resources.states.map((state) => (
                <div key={state} className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2 text-black">{state}</h5>
                  <ul className="space-y-1">
                    {formData.resources.regions[state]?.map((region) => (
                      <li key={region} className="text-sm text-gray-600">
                        • {region}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Management */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Resources</h3>
          
          {/* Category Selection */}
          <div className="space-y-4">
            <select
              value={selectedResourceCategory}
              onChange={(e) => setSelectedResourceCategory(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-md"
            >
              <option value="">Select a category</option>
              {formData.resources.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* State and Region Selection for Regional Flip Books */}
            {selectedResourceCategory === 'Regional Flip Books' && (
              <div className="grid grid-cols-2 gap-4 text-black">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select a state</option>
                  {formData.resources.states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>

                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  disabled={!selectedState}
                >
                  <option value="">Select a region</option>
                  {formData.resources.regions[selectedState]?.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Upload Section */}
            {selectedResourceCategory && (
              <div className="border-2 border-dashed rounded-lg p-8">
                <div className="flex flex-col items-center justify-center">
                  <input
                    type="file"
                    onChange={(e) => handleCoverImageUpload(e.target.files[0])}
                    className="hidden"
                    id="cover-image-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="cover-image-upload"
                    className="cursor-pointer text-center"
                  >
                    <div className="mb-4">
                      <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-900">Upload Cover Image</p>
                  </label>

                  <input
                    type="file"
                    onChange={(e) => handleResourceUpload(e.target.files[0], coverImage, youtubeLink)}
                    className="hidden"
                    id="resource-upload"
                    accept={selectedResourceCategory === 'Movies' ? 'video/*' : '.pdf,.doc,.docx'}
                  />
                  <label
                    htmlFor="resource-upload"
                    className="cursor-pointer text-center"
                  >
                    <div className="mb-4">
                      <Plus className="h-12 w-12 mx-auto text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-900">Upload {selectedResourceCategory}</p>
                  </label>

                  {selectedResourceCategory === 'Movies' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Or provide YouTube link
                      </label>
                      <input
                        type="text"
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                        className="w-full px-4 py-2 border text-black rounded-md"
                        placeholder="Enter YouTube link"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Display Uploaded Resources */}
            {selectedResourceCategory && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedResourceCategory === 'Regional Flip Books' 
                  ? (Array.isArray(formData.resources.items[selectedResourceCategory]?.[selectedState]?.[selectedRegion]) 
                      ? formData.resources.items[selectedResourceCategory][selectedState][selectedRegion] 
                      : []
                    ).map((item, index) => (
                      <ResourceItem
                        key={`${selectedState}-${selectedRegion}-${index}`}
                        item={item}
                        onRemove={() => handleRemoveResource(selectedResourceCategory, selectedState, selectedRegion, index)}
                        onTitleChange={(newTitle) => handleResourceTitleChange(selectedResourceCategory, selectedState, selectedRegion, index, newTitle)}
                      />
                    ))
                  : (Array.isArray(formData.resources.items[selectedResourceCategory]) 
                      ? formData.resources.items[selectedResourceCategory] 
                      : []
                    ).map((item, index) => (
                      <ResourceItem
                        key={index}
                        item={item}
                        onRemove={() => handleRemoveResource(selectedResourceCategory, index)}
                        onTitleChange={(newTitle) => handleResourceTitleChange(selectedResourceCategory, index, newTitle)}
                      />
                    ))
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}