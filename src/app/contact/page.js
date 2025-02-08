"use client"
import { useState } from 'react';
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your form submission logic
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main className="min-h-screen text-black bg-white">
            <NavBar />
            
            <div className="text-center py-8">
                <h1 className="text-4xl md:text-5xl font-serif">Contact Us</h1>
                <hr className="my-4 border-black mx-auto w-3/4" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Contact Form */}
                        <div className="md:w-1/2 p-8">
                            <h2 className="text-3xl font-serif mb-8">Send us a Message</h2>
                            
                            {submitSuccess && (
                                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6B352]"
                                        required
                                    />
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
                                    className="w-full bg-[#F6B352] text-black py-3 rounded-lg hover:bg-[#E4A853] transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="md:w-1/2 bg-gray-50 p-8">
                            <h2 className="text-3xl font-serif mb-8">Get in Touch</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                                    <p className="text-gray-600">
                                        Test address<br />
                                        Maharashtra,<br />
                                        India
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                                    <p className="text-gray-600">
                                        info@iksgyangunjan.com<br />
                                        support@iksgyangunjan.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}