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
  const changePage = ({ selected }) => setPageNo(selected);

  // Featured testimony
  const featured = testimonies[0];

  // Remaining testimonies for pagination
  const liveTestimonies = testimonies
    .slice(1)
    .slice(livePage, livePage + testimoniesPerPage)
    .map((testimony, index) => {
      const ringColor = ['ring-[#002F6C]', 'ring-[#FDCB58]', 'ring-[#00AEEF]'][index % 3];
      return (
        <div
          key={index}
          className={`
            bg-white border border-gray-200 p-6 rounded-2xl shadow-md m-4 w-80
            transform transition-transform duration-300 hover:scale-105 hover:shadow-lg
            animate-slide-in
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col items-center text-center">
            <img
              className={`rounded-full w-24 h-24 object-cover mb-4 ring-4 transition-all duration-300 hover:ring-8 ${ringColor}`}
              src={testimony.image}
              alt={`${testimony.name}'s image`}
            />
            <h1 className="text-lg font-bold text-[#002F6C] font-poppins">{testimony.name}</h1>
            <p className="text-gray-600 mt-2 font-inter text-sm italic">“{testimony.testimonial}”</p>
          </div>
        </div>
      );
    });

  return (
    <>
      {/* Custom animation */}
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

      <div className="bg-[#F9FAFB] py-20 mt-14">
        {/* Section Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-[#002F6C] font-poppins">
          What Our Community Says
        </h1>

        {/* Featured Testimony */}
        {featured && (
          <div className="max-w-4xl mx-auto mb-16 px-6">
            <div className="bg-gradient-to-r from-[#002F6C] to-[#004080] rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
              <img
                src={featured.image}
                alt={`${featured.name}'s image`}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-[#FDCB58]"
              />
              <div className="text-left text-white">
                <h3 className="text-2xl font-bold font-poppins mb-2">{featured.name}</h3>
                <p className="font-inter text-base italic">
                  “{featured.testimonial}”
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Testimony Grid */}
        <div className="flex justify-center flex-wrap px-4">
          {liveTestimonies}
        </div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="flex justify-center items-center my-8 space-x-2"
          pageClassName="w-3 h-3 bg-gray-300 rounded-full cursor-pointer"
          pageLinkClassName="hidden"
          activeClassName="bg-[#FDCB58]"
          previousClassName="rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-110"
          nextClassName="rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-110"
          disabledClassName="opacity-30 cursor-not-allowed"
          previousLinkClassName="w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-[#002F6C] hover:bg-gray-100"
          nextLinkClassName="w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-[#002F6C] hover:bg-gray-100"
        />
      </div>
    </>
  );
}
