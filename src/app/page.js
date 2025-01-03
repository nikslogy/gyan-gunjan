import React from 'react';
import { NavBar } from '@/components/nav-bar';
import { HeroSection } from "@/components/hero-section";

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
    </main>
  );
};

export default Home;