import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Testimonies() {
  const [testimonies, setTestimonies] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const testimoniesPerPage = 3;
  const livePage = pageNo * testimoniesPerPage;

  const fetchTestimonies = async () => {
    try {
      const results = await fetch('/src/data/testimonies.json');
      const data = await results.json();
      setTestimonies(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const pageCount = Math.ceil(testimonies.length / testimoniesPerPage);

  const changePage = ({ selected }) => {
    setPageNo(selected);
  };

  const liveTestimonies = testimonies.slice(livePage, livePage + testimoniesPerPage).map((testimony, index) => (
    <div
      key={index}
      className={`
        bg-white p-6 rounded-lg shadow-xl m-4 flex-shrink-0 w-80 
        transform transition-all duration-500 ease-out hover:scale-105 hover:z-10
        animate-slide-in
      `}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="flex flex-col items-center text-center">
        <img
          className="rounded-full w-24 h-24 object-cover mb-4 ring-4 ring-blue-500 transition-all duration-300 hover:ring-8"
          src={testimony.image}
          alt={testimony.name + "'s image"}
        />
        <h1 className="text-xl font-bold text-gray-800">{testimony.name}</h1>
        <p className="text-gray-600 mt-2">{testimony.testimonial}</p>
      </div>
    </div>
  ));

  return (
    <>
      {/* Tailwind CSS for the custom animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
      
      <div className="bg-gray-100 py-16 mt-14">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Community Says About Us
        </h1>
        <div className="flex justify-center flex-wrap px-4">
          {liveTestimonies}
        </div>
        
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="flex justify-center items-center my-8 space-x-2"
          pageClassName="w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300"
          pageLinkClassName="hidden"
          activeClassName="bg-blue-500"
          activeLinkClassName=""
          previousClassName="rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-110"
          nextClassName="rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-110"
          disabledClassName="opacity-30 cursor-not-allowed"
          previousLinkClassName="w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-gray-700 hover:bg-gray-100"
          nextLinkClassName="w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-gray-700 hover:bg-gray-100"
        />
      </div>
    </>
  );
}