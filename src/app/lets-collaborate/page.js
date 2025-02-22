"use client"
import { useState, useEffect } from 'react';
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
        }
    });

    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const API_BASE_URL = 'admin.iksgyangunjan.in';


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitSuccess(false);
        
        const formPayload = new FormData();
        
        formPayload.append('first_name', formData.firstName);
        formPayload.append('last_name', formData.lastName);
        formPayload.append('email', formData.email);
        formPayload.append('message', formData.message);
        formPayload.append('subscribed', formData.newsletter);

        if (formData.files.pdf) formPayload.append('pdf', formData.files.pdf);
        if (formData.files.image) formPayload.append('photo', formData.files.image);
        if (formData.files.video) formPayload.append('video', formData.files.video);

        try {
            const response = await fetch(`${API_BASE_URL}/contribute/api/contributions/`, {
                method: 'POST',
                body: formPayload
            });

            if (!response.ok) throw new Error('Submission failed');

            // Reset form on success
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                newsletter: false,
                files: { pdf: null, image: null, video: null },
                uploadOptions: { pdf: false, image: false, video: false }
            });
            
            setSubmitSuccess(true);

        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen text-black bg-white">
            <NavBar />
            
            <div className="text-center py-8">
                <h1 className="mt-20 text-4xl md:text-5xl">Let's Collaborate</h1>
                <hr className="my-4 border-black mx-auto w-3/4" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-custom shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-8 md:p-12">
                            <h2 className="text-3xl mb-8">Collaborate With Us</h2>
                            
                            {submitSuccess && (
                                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                                    Thank you for your contribution! 🙏 Your submission helps us grow and improve. 
                                    We'll review your materials and be in touch soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <div>
                                    <label className="block text-sm mb-2">Upload Files:</label>
                                    <div className="flex flex-col space-y-4">
                                        {/* PDF Upload */}
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

                                        {/* Image Upload */}
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

                                        {/* Video Upload */}
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

                                <div>
                                    <label className="block text-sm mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-[#F6B352] text-black py-3 rounded-custom2 hover:bg-[#E4A853] transition-colors ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Submitting...' : 'Submit Contribution'}
                                </button>
                            </form>
                        </div>

                        <div className="md:w-1/2 relative min-h-[400px] md:min-h-full">
                            <Image
                                src="/images/lahaul_hp.jpg"
                                alt="Collaboration Visual"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}