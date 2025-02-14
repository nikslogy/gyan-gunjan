import React from 'react';
import { NavBar } from '@/components/nav-bar';
import { HeroSection } from "@/components/hero-section";
import { Footer } from '@/components/footer';

const Home = () => {
  return (
    <div className="page-wrapper">
      <NavBar />
      <main className="content-wrapper">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;