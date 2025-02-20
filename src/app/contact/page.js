"use client"
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function Contact() {
    return (
        <div className="page-wrapper">
            <div className="navbar-wrapper">
                <NavBar />
            </div>
            
            <main className="content-wrapper">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Title Section */}
                        <h1 className="text-3xl md:text-4xl font-bold text-[#7A2631] text-center">
                            Contact Us
                        </h1>

                        {/* Contact Card */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Head Office */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#7A2631]">IKS Division</h3>
                                    <div className="text-gray-700 space-y-2">
                                        <p>AICTE,<br/>
                                        Nelson Mandela Marg, Vasant Kunj,<br />
                                        New Delhi-110070</p>
                                        <a href="mailto:iksgyangunjan@aicte-india.org" 
                                           className="block text-[#7A2631] hover:text-[#F6B352] transition-colors font-crimson-pro">
                                            iksgyangunjan@aicte-india.org
                                        </a>
                                    </div>
                                </div>

                                {/* CKA */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-[#7A2631]">Center for Knowledge Alternatives</h3>
                                    <div className="text-gray-700 space-y-2">
                                        <p>FLAME University,<br/> 
                                        Gat No. 1270, Lavale,<br />
                                        Off. Pune-Bangalore Highway, Vadzai,<br />
                                        Pune-412115</p>
                                        <a href="mailto:cka@flame.edu.in" 
                                           className="block text-[#7A2631] hover:text-[#F6B352] font-crimson-pro transition-colors">
                                            cka@flame.edu.in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}