"use client"

import { useState } from "react"
import { HeroSection1 } from "./hero-section/HeroSection1"
import { HeroSection2 } from "./hero-section/HeroSection2"
import { HeroSection3 } from "./hero-section/HeroSection3"
import LandingResources from "@/components/landing-resources"

export function HeroSection() {

  return (
    <main className="container mx-auto px-4 md:px-6 max-w-7xl">
      {/* First Section */}
      <HeroSection1 />

      {/* Second Section */}
      <HeroSection3 />

      {/* Third Section */}
      <HeroSection2 />

      {/* Landing Resources Section */}
      <section>
        <LandingResources />
      </section>
    </main>
  )
}