import { useEffect, useState, React } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ReactPaginate from "react-paginate";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const eventsPerPage = 4;
    const currentPage = pageNumber * eventsPerPage;

    const currentEvents = events.slice(currentPage, currentPage + eventsPerPage).map((event, index) => {
        return (
            <div 
                key={index} 
                className="
                    bg-white p-6 rounded-xl shadow-lg 
                    transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl 
                    mx-auto my-4 w-[95%] md:w-[70%] lg:w-[45%] lg:mx-0
                    animate-fade-in
                "
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
                    <div className="flex-1 my-auto text-center lg:text-left">
                        <p className="text-blue-600 font-semibold text-sm uppercase">{event.type}</p>
                        <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 mt-1">{event.title}</h1>
                        <p className="mt-2 text-gray-600">{event.description}</p>
                        <p className="font-bold text-gray-700 mt-4">Hosted By: <span className="text-gray-900">{event.hostedBy}</span></p>
                        <p className="font-semibold text-gray-500 mt-1">{event.date}</p>
                    </div>
                    <button className="bg-blue-600 h-12 px-8 rounded-lg font-bold text-white whitespace-nowrap transition-all duration-300 hover:bg-green-500 hover:scale-105 my-auto">
                        <a href={event.zoomLink} target="_blank" rel="noopener noreferrer">Register</a>
                    </button>
                </div>
            </div> 
        );
    });

    const eventsCount = Math.ceil(events.length / eventsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const results = await fetch('/src/data/events.json');
                const data = await results.json();
                
                // --- New Sorting Logic ---
                const sortedData = [...data].sort((a, b) => {
                    const aIsJob = a.type.toLowerCase().includes('career') || a.type.toLowerCase().includes('job');
                    const bIsJob = b.type.toLowerCase().includes('career') || b.type.toLowerCase().includes('job');
                    
                    if (aIsJob && !bIsJob) {
                        return -1; // a comes first
                    }
                    if (!aIsJob && bIsJob) {
                        return 1; // b comes first
                    }
                    return 0; // maintain original order for other events
                });
                
                setEvents(sortedData);

            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>

            <div className="py-12 px-4">
                <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Upcoming Events</h1>
                <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center lg:space-x-8">
                    {currentEvents}
                </div>
            </div>

            <div className="mb-8">
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={eventsCount}
                    onPageChange={changePage}
                    containerClassName="flex justify-center items-center space-x-2 my-6"
                    pageClassName="w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300"
                    pageLinkClassName="hidden"
                    activeClassName="bg-blue-500"
                    previousClassName="rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-110"
                    nextClassName="rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-110"
                    disabledClassName="opacity-30 cursor-not-allowed"
                    previousLinkClassName="w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-gray-700 hover:bg-gray-100"
                    nextLinkClassName="w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-gray-700 hover:bg-gray-100"
                />
            </div>
            <Footer />
        </div>
    );
}