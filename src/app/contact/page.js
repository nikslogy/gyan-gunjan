"use client"
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function Contact() {
    return (
        <main className="min-h-screen text-black bg-white">
            <NavBar />
            
            <div className="text-center py-8">
                <h1 className="mt-20 text-4xl md:text-5xl">Contact Us</h1>
                <hr className="my-4 border-black mx-auto w-3/4" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-3xl mb-8">Get in Touch</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Address</h3>
                                <p className="text-gray-600 font-inter">
                                Head Office:<br />
                                Nelson Mandela Marg, Vasant Kunj,<br />
                                New Delhi-110070
                                </p>
                                <br />
                                <p className="text-gray-600 font-inter">
                                    CKA:<br />
                                    Flame University,Gate No. 1270, Lavale, 
                                    <br />
                                    Off. Pune-Bangalore Highway, Vadzai,
                                    <br />
                                    Pune-412115
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Email</h3>
                                <p className="text-gray-600">
                                    <a href="mailto:iksgyangunjan@aicte-india.org" className="hover:text-[#F6B352] transition-colors">iksgyangunjan@aicte-india.org</a><br />
                                    <a href="mailto:cka@flame.edu.in" className="hover:text-[#F6B352] transition-colors">cka@flame.edu.in</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}