"use client"
import { useState } from 'react';
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function Careers() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        resume: null
    });

    const jobOpenings = [
        {
            id: 1,
            title: "Researcher",
            location: "Puen",
            type: "Full-time",
            experience: "2-5 years",
            description: "We're looking for a passionate Researcher to join our team..."
        },
        {
            id: 2,

            title: "Designer",
            location: "Pune",
            type: "Full-time",
            experience: "3-6 years",
            description: "We're looking for a passionate Designer to join our team..."

        },
        {
            id: 3,
            title: "Web developer",
            location: "Pune",
            type: "Full-time",
            experience: "1-3 years",
            description: "We're looking for a passionate Web developer to join our team..."


        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        setShowModal(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            position: '',
            resume: null
        });
    };

    return (
        <main className="min-h-screen bg-white">
            <NavBar />
            
            {/* Hero Section */}
            <div className="relative h-[400px] max-w-7xl mx-auto rounded-custom overflow-hidden my-8">
                <Image
                    src="/images/Arecanut_01.png"
                    alt="Careers at Gyan Gunjan"
                    fill
                    className="object-cover brightness-50 rounded-2xl"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Join Our Team</h1>
                    <p className="text-xl text-center max-w-2xl px-4">
                        Shape the future of education with us
                    </p>
                </div>
            </div>

            {/* Benefits Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-serif text-center mb-16 text-gray-800 relative">
                        Why Join Us?
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F6B352]"></div>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Growth & Learning',
                                icon: '🚀',
                                description: 'Continuous learning opportunities and career advancement paths'
                            },
                            {
                                title: 'Collaborative Environment',
                                icon: '🤝',
                                description: 'Work with passionate educators in a supportive atmosphere'
                            },
                            {
                                title: 'Competitive Benefits',
                                icon: '✨',
                                description: 'Comprehensive package including health, wellness and more'
                            }
                        ].map((benefit, index) => (
                            <div 
                                key={index} 
                                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Current Openings Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-serif text-center mb-12 text-gray-800">Current Openings</h2>
                    
                    <div className="space-y-6">
                        {jobOpenings.map((job) => (
                            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{job.title}</h3>
                                        <div className="space-y-1 text-gray-600">
                                            <p><span className="font-medium">Location:</span> {job.location}</p>
                                            <p><span className="font-medium">Type:</span> {job.type}</p>
                                            <p><span className="font-medium">Experience:</span> {job.experience}</p>
                                            <p><span className="font-medium">Description:</span> {job.description}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setFormData({...formData, position: job.title});
                                            setShowModal(true);
                                        }}
                                        className="mt-4 md:mt-0 bg-[#F6B352] text-white px-6 py-2 rounded-lg hover:bg-[#E4A853] transition-colors"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Apply for {formData.position}</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border rounded-lg text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-2 border rounded-lg text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full p-2 border rounded-lg text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                                <input
                                    type="file"
                                    required
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setFormData({...formData, resume: e.target.files[0]})}
                                    className="w-full p-2 border rounded-lg text-black"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#F6B352] text-white py-2 rounded-lg hover:bg-[#E4A853] transition-colors"
                            >
                                Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}