"use client"

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-4 py-4">
      <div className="max-w-7xl mx-auto rounded-custom bg-[#c4deff] px-6 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6">
          {/* Left side - Logos */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <Image
                src="/images/ministry-logo.png"
                alt="Ministry of Education"
                width={120}
                height={60}
                className="object-contain"
              />
              <Image
                src="/images/iks-logo-removebg-preview.png"
                alt="Gyan Gunjan"
                width={120}
                height={60}
                className="object-contain -ml-6"
              />
            </div>
            <div className="flex items-center justify-center -mt-12">
              <Image
                src="/images/flame-university.png"
                alt="Flame University"
                width={150}
                height={60}
                className="object-contain"
              />
              <Image
                src="/images/cka.png"
                alt="CKA Logo"
                width={120}
                height={30}
                className="object-contain -ml-6"
              />
            </div>
          </div>

          {/* Right side - Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center justify-items-center">
            {/* First Column */}
            <div className="flex flex-col gap-1.5 md:gap-2 items-center">
              <Link href="/about-project" className="text-[#1a365d] hover:text-gray-900 text-sm">
                About the Project
              </Link>
              <Link href="/jeevan-darshan" className="text-[#1a365d] hover:text-gray-900 text-sm">
                Jeevan Darshan
              </Link>
              <Link href="/resources" className="text-[#1a365d] hover:text-gray-900 text-sm">
                Resources
              </Link>
              <Link href="/lets-collaborate" className="text-[#1a365d] hover:text-gray-900 text-sm">
                Lets Collaborate
              </Link>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-1.5 md:gap-2 items-center">
              <Link href="/contact" className="text-[#1a365d] hover:text-gray-900 text-sm">
                Contact Us
              </Link>
              <Link href="https://iksindia.org/about.php" className="text-[#1a365d] hover:text-gray-900 text-sm" target="_blank" rel="noopener noreferrer">
                About IKS Division
              </Link>
              <Link href="https://www.flame.edu.in/cka/about-the-centre.php" className="text-[#1a365d] hover:text-gray-900 text-sm" target="_blank" rel="noopener noreferrer">
                About CKA
              </Link>
            </div>

            {/* Third Column - Only visible on desktop */}
            <div className="hidden md:flex flex-col gap-1.5 md:gap-2 items-center">
              <Link href="#" className="text-[#1a365d] hover:text-gray-900 text-sm">
                Terms of Use
              </Link>
              <Link href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#1a365d] hover:text-gray-900 text-sm">
                Creative Commons 4.0
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };