"use client"

import { useState } from "react";
import HeroSection1 from "@/components/admin/hero-section1";
import HeroSection2 from "@/components/admin/hero-section2";
import HeroSection3 from "@/components/admin/hero-section3";
import AboutProject from "@/components/admin/about-project";
import HundredRegions from "@/components/admin/100-regions";
import JeevanDarshan from "@/components/admin/jeevan-darshan";
import Resources from "@/components/admin/resources";
import Collaborators from "@/components/admin/collaborator";


export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('hero-section-1');
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    // Hero Section 1
    heroSection1: {
      heading: "Iks Gyan Gunjan",
      description: "Lorem ipsum dolor sit amet...",
      sliderImages: [
        { src: "/images/Bohag_Bihu.png", alt: "Traditional dancers in red attire" },
        { src: "/images/Arecanut_01.png", alt: "Second Image" },
        { src: "/images/lahaul_hp.jpg", alt: "Third Image" },
        { src: "/images/Sindoor_Play.jpeg", alt: "Fourth Image" }
      ]
    },
    // Hero Section 2
    heroSection2: {
      heading: "100 regions",
      description: "Lorem ipsum dolor sit amet...",
      sliderImages: [
        { src: "/images/map.png", alt: "Map of India" },
        { src: "/images/region1.png", alt: "Region 1" }
      ]
    },
    // Hero Section 3
    heroSection3: {
      heading: "Jeevan Darshan",
      description: "Lorem ipsum dolor sit amet...",
      patternImages: [
        {
          image: "/images/P2.svg",
          title: "Lorem ipsum 3",
          description: "Pattern description here",
          position: "absolute right-[8%] bottom-[12%] w-[40%] rotate-[-7deg]",
          shape: "rounded-custom5",
          titleRotation: "rotate-[9deg]"
        },
        {
          image: "/images/P1.svg",
          title: "Lorem ipsum 2",
          description: "Pattern description here",
          position: "absolute right-[6%] top-[10%] w-[40%] rotate-[6deg]",
          shape: "rounded-custom4",
          titleRotation: "rotate-[-7deg]"
        }
      ]
    },
    // About Project Page
    aboutProject: {
      heading: "About the Project",
      tagline: "Iks Gyan Gunjan",
      description1: "Lorem ipsum dolor sit amet...",
      description2: "Excepteur sint occaecat...",
      sliderImages: [
        { src: "/images/about1.png", alt: "About Image 1" },
        { src: "/images/about2.png", alt: "About Image 2" }
      ]
    },
    // Jeevan Darshan Page
    jeevanDarshan: {
      heading: "Jeevan Darshan",
      categories: [
        {
          name: 'Nature & Agriculture',
          description1: "Lorem ipsum dolor sit amet...",
          description2: "Excepteur sint occaecat...",
          images: [
            { src: "/images/nature1.png", alt: "Nature Image 1" },
            { src: "/images/nature2.png", alt: "Nature Image 2" }
          ]
        },
        {
          name: 'Family & Community',
          description1: "Lorem ipsum dolor sit amet...",
          description2: "Excepteur sint occaecat...",
          images: [
            { src: "/images/family1.png", alt: "Family Image 1" },
            { src: "/images/family2.png", alt: "Family Image 2" }
          ]
        }
      ]
    },
    // Add resources section
    resources: {
      categories: [
        'Coffee Table Books',
        'Regional Flip Books',
        'Movies',
        'Thematic Concept Notes'
      ],
      states: [],
      regions: {},
      items: {
        'Coffee Table Books': [],
        'Regional Flip Books': [],
        'Movies': [],
        'Thematic Concept Notes': {}
      }
    }
  })

  // Add state for resources management
  const [newCategory, setNewCategory] = useState('')
  const [selectedResourceCategory, setSelectedResourceCategory] = useState('')
  const [newState, setNewState] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [newRegion, setNewRegion] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  // Image handling functions
  const handleImageUpload = async (section, index, category = null) => {
    // Create a file input
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      try {
        //server/storage upload
        // For now using placeholder
        const imageUrl = URL.createObjectURL(file)

        if (category !== null) {
          // Update category image
          setFormData(prev => ({
            ...prev,
            jeevanDarshan: {
              ...prev.jeevanDarshan,
              categories: prev.jeevanDarshan.categories.map((cat, idx) =>
                idx === category
                  ? {
                    ...cat,
                    images: cat.images.map((img, imgIdx) =>
                      imgIdx === index ? { ...img, src: imageUrl } : img
                    )
                  }
                  : cat
              )
            }
          }))
        } else {
          // Update section image
          setFormData(prev => ({
            ...prev,
            [section]: {
              ...prev[section],
              sliderImages: prev[section].sliderImages.map((img, idx) =>
                idx === index ? { ...img, src: imageUrl, alt: file.name } : img
              )
            }
          }))
        }
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }

    input.click()
  }

  const handleAddSliderImage = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        sliderImages: [...prev[section].sliderImages, { src: "", alt: "" }]
      }
    }))
  }

  const handleRemoveImage = (section, index, category = null) => {
    if (category !== null) {
      setFormData(prev => ({
        ...prev,
        jeevanDarshan: {
          ...prev.jeevanDarshan,
          categories: prev.jeevanDarshan.categories.map((cat, idx) =>
            idx === category
              ? {
                ...cat,
                images: cat.images.filter((_, imgIdx) => imgIdx !== index)
              }
              : cat
          )
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          sliderImages: prev[section].sliderImages.filter((_, idx) => idx !== index)
        }
      }))
    }
  }

  const handleAddPatternImage = () => {
    const newPattern = {
      image: "",
      title: "",
      description: "",
      position: "absolute",
      shape: "rounded-custom",
      titleRotation: "rotate-0"
    }
    setFormData(prev => ({
      ...prev,
      heroSection3: {
        ...prev.heroSection3,
        patternImages: [...prev.heroSection3.patternImages, newPattern]
      }
    }))
  }

  const handleAddJeevanDarshanCategory = () => {
    const newCategory = {
      name: 'New Category',
      description1: "",
      description2: "",
      images: []
    }
    setFormData(prev => ({
      ...prev,
      jeevanDarshan: {
        ...prev.jeevanDarshan,
        categories: [...prev.jeevanDarshan.categories, newCategory]
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would typically make an API call to save the data
      console.log('Saving changes:', formData)
      // Show success message
      alert('Changes saved successfully!')
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('Error saving changes. Please try again.')
    }
  }

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

  const handleResourceUpload = async (file) => {
    if (!file) return;

    try {
      // Here you would typically upload to your server/storage
      // For now, we'll use a placeholder URL
      const fileUrl = URL.createObjectURL(file);
      const newResource = {
        title: file.name,
        file: fileUrl,
        image: selectedResourceCategory === 'Movies' 
          ? '/images/video-thumbnail.png'  // Add a default video thumbnail
          : '/images/document-thumbnail.png'  // Add a default document thumbnail
      };

      if (selectedResourceCategory === 'Thematic Concept Notes') {
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
                ...prev.resources.items[selectedResourceCategory],
                [selectedState]: {
                  ...prev.resources.items[selectedResourceCategory]?.[selectedState],
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
                ...(prev.resources.items[selectedResourceCategory] || []),
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

  const handleAddState = (newState) => {
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
  };

  const handleAddRegion = (state, newRegion) => {
    if (!newRegion.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        regions: {
          ...prev.resources.regions,
          [state]: [...(prev.resources.regions[state] || []), newRegion.trim()]
        }
      }
    }));
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
          className="w-full px-3 py-1 border rounded-md text-sm"
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
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl text-center font-bold text-[#7A2631] mb-8">Admin Control Panel</h1>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'hero-section-1', label: 'Hero Section 1' },
            { id: 'hero-section-2', label: 'Hero Section 2' },
            { id: 'hero-section-3', label: 'Hero Section 3' },
            { id: 'about-project', label: 'About Project' },
            { id: '100-regions', label: '100 Regions' },
            { id: 'jeevan-darshan', label: 'Jeevan Darshan' },
            { id: 'resources', label: 'Resources' },
            { id: 'collaborators', label: 'Collaborators' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-[#7A2631] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Editor */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section 1 Editor */}
          {activeSection === 'hero-section-1' && (
            <HeroSection1 formData={formData} setFormData={setFormData} />
          )}

          {/* Hero Section 2 Editor */}
          {activeSection === 'hero-section-2' && (
            <HeroSection2 formData={formData} setFormData={setFormData} />
          )}

          {/* Hero Section 3 Editor */}
          {activeSection === 'hero-section-3' && (
            <HeroSection3 formData={formData} setFormData={setFormData} />
          )}

          {/* About Project Editor */}
          {activeSection === 'about-project' && (
            <AboutProject formData={formData} setFormData={setFormData} />
          )}

          {/* 100 regions Editior */}
          {activeSection === '100-regions' && (
            <HundredRegions formData={formData} setFormData={setFormData} />
          )}

          {/* Jeevan Darshan Editor */}
          {activeSection === 'jeevan-darshan' && (
            <JeevanDarshan formData={formData} setFormData={setFormData} />
          )}

          {/* Resources Editor */}
          {activeSection === 'resources' && (
            <Resources formData={formData} setFormData={setFormData} />
          )}
          {activeSection === 'collaborators' && (
            <Collaborators formData={formData} setFormData={setFormData} />
          )}
          
          <button type="submit" className="mt-8 px-6 py-3 bg-[#7A2631] text-white rounded-md hover:bg-[#9B2C2C]">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}