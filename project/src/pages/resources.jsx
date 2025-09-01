import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Resources() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800">Resource Library</h1>
        <p className="text-center text-lg md:text-xl text-gray-600 mt-2">Curated content to help you succeed.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {/* First card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `0ms` }}>
            <h1 className="font-bold text-xl text-gray-800">Choose your career</h1>
            <p className="text-gray-500 text-sm mt-1">By Ali Abbadah</p>
            <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
              <a href="https://youtu.be/O3m14PVOq_g" className="block py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600">View Resources</a>
            </div>
          </div>

          {/* Second card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `100ms` }}>
            <h1 className="font-bold text-xl text-gray-800">CV & Cover Letter Template</h1>
            <p className="text-gray-500 text-sm mt-1">By David Muhinz</p>
            <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
              <a href="https://www.indeed.com/career-advice/cover-letter-samples" className="block py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600">View Resources</a>
            </div>
          </div>

          {/* Third card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `200ms` }}>
            <h1 className="font-bold text-xl text-gray-800">JavaScript</h1>
            <p className="text-gray-500 text-sm mt-1">By Careb Can</p>
            <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
              <a href="https://youtu.be/W6NZfCO5SIk" className="block py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600">View Resources</a>
            </div>
          </div>

          {/* Fourth card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `300ms` }}>
            <h1 className="font-bold text-xl text-gray-800">Financial Literacy</h1>
            <p className="text-gray-500 text-sm mt-1">By David Muhinz</p>
            <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
              <a href="https://corporatefinanceinstitute.com/resources/wealth-management/financial-literacy/#:~:text=Start%20Free-,What%20is%20Financial%20Literacy%3F,to%20as%20being%20financially%20illiterate." className="block py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600">View Resources</a>
            </div>
          </div>
          
          {/* Fifth card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `400ms` }}>
            <h1 className="font-bold text-xl text-gray-800">Critical & Cognitive Skills</h1>
            <p className="text-gray-500 text-sm mt-1">By Jane Inema</p>
            <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
              <a href="https://www.ncbi.nlm.nih.gov/books/NBK84224/" className="block py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600">View Resources</a>
            </div>
          </div>

          {/* Sixth card */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `500ms` }}>
            <h1 className="font-bold text-xl text-gray-800">TailwindCSS</h1>
            <p className="text-gray-500 text-sm mt-1">By Can Sanem</p>
            <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
              <a href="https://tailwindcss.com/docs/installation/using-vite" className="block py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600">View Resources</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Custom animation style block */}
      <style jsx>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Resources;