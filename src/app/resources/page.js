import { NavBar } from "@/components/nav-bar";
export default function ResourcesPage() {
  return (
    <>

    <NavBar/>
    
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-display text-center mb-16">Nature & Agriculture</h1>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Book Image Section */}
        <div className="flex-1">
          <div className="relative">
            <img 
              src="/images/CTB_P4_CP_1.png" 
              alt="Nature & Agricultural Traditions of Bharat"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          
          <a 
            href="#" 
            className="inline-block px-8 py-3 bg-[#8B2635] text-white rounded-lg 
                     text-lg font-medium hover:bg-[#7A1F2D] transition-colors"
          >
            Read Book
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
