import React from 'react';
import { NavBar } from '@/components/nav-bar';
import { HeroSection } from "@/components/hero-section";
import { Footer } from '@/components/footer';

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <Footer/>
    </main>
  );
};

export default Home;