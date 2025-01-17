"use client"

import { useState } from 'react';
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function LetsColaborate() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        newsletter: false,
        files: {
            pdf: null,
            image: null,
            video: null
        },
        uploadOptions: {
            pdf: false,
            image: false,
            video: false
        },
        showContributors: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //submission logic
    };

    return (
        <main className="min-h-screen text-black bg-white">
            <NavBar />
            
            {/* Page Title */}
            <div className="text-center py-8">
                <h1 className="text-4xl md:text-5xl font-serif">Let's Collaborate</h1>
                <hr className="my-4 border-black mx-auto w-3/4" />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-custom shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Form Section */}
                        <div className="md:w-1/2 p-8 md:p-12">
                            <h2 className="text-3xl font-serif mb-8">Collaborate With Us</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm mb-2">Email ID</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                        required
                                    />
                                </div>

                                {/* File Uploads */}
                                <div>
                                    <label className="block text-sm mb-2">Upload Files:</label>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.uploadOptions.pdf}
                                                onChange={(e) => setFormData({...formData, uploadOptions: {...formData.uploadOptions, pdf: e.target.checked}})}
                                                className="mr-2"
                                            />
                                            <label>PDF Upload</label>
                                        </div>
                                        {formData.uploadOptions.pdf && (
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => setFormData({...formData, files: {...formData.files, pdf: e.target.files[0]}})}
                                                    className="mr-2"
                                                />
                                                <label>Upload PDF</label>
                                            </div>
                                        )}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.uploadOptions.image}
                                                onChange={(e) => setFormData({...formData, uploadOptions: {...formData.uploadOptions, image: e.target.checked}})}
                                                className="mr-2"
                                            />
                                            <label>Image Upload</label>
                                        </div>
                                        {formData.uploadOptions.image && (
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setFormData({...formData, files: {...formData.files, image: e.target.files[0]}})}
                                                    className="mr-2"
                                                />
                                                <label>Upload Image</label>
                                            </div>
                                        )}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.uploadOptions.video}
                                                onChange={(e) => setFormData({...formData, uploadOptions: {...formData.uploadOptions, video: e.target.checked}})}
                                                className="mr-2"
                                            />
                                            <label>Video Upload</label>
                                        </div>
                                        {formData.uploadOptions.video && (
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => setFormData({...formData, files: {...formData.files, video: e.target.files[0]}})}
                                                    className="mr-2"
                                                />
                                                <label>Upload Video</label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block text-sm mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                        required
                                    />
                                </div>

                                {/* Newsletter Checkbox */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="newsletter"
                                        checked={formData.newsletter}
                                        onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                                        className="h-4 w-4 text-[#F6B352] focus:ring-[#F6B352] border-gray-300 rounded"
                                    />
                                    <label htmlFor="newsletter" className="ml-2 text-sm">
                                        Get subscribed to our newsletter.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#F6B352] text-black py-3 rounded-lg hover:bg-[#E4A853] transition-colors"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/2 relative min-h-[400px] md:min-h-full">
                            <Image
                                src="/images/lahaul_hp.jpg"
                                alt=""
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Contributors List Dropdown */}
                <div className="mt-8">
                    <button 
                        onClick={() => setFormData(prev => ({...prev, showContributors: !prev.showContributors}))} 
                        className="w-full bg-[#c4deff] p-4 rounded-custom2 flex justify-center items-center"
                    >
                        <h2 className="text-2xl font-bold text-center">List of Contributors</h2>
                        <svg 
                            className={`w-6 h-6 transition-transform ml-2 ${formData.showContributors ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    {formData.showContributors && (
                        <div className="bg-[#F6B352] p-8 rounded-b-lg">
                            <div className="grid grid-cols-5 gap-4">
                                {Array(60).fill('Lorem ipsum').map((text, index) => (
                                    <div key={index} className="text-black">
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}