import { useEffect, useState, React } from "react";
import Logoutnavbar from "../components/logoutnavbar";
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
                    mx-auto my-4 w-[95%] md:w-[70%] lg:w-[80%]
                    animate-fade-in lg:mx-auto
                "
                style={{ animationDelay: `${index * 100}ms`,background: "linear-gradient(to right, #002F6C, #FDCB58)", }} 
            >
                <div className="flex flex-col  lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
                    <div className="flex-1 my-auto text-center lg:text-left">
                        <p className="text-blue-600 font-semibold text-sm uppercase">{event.type}</p>
                        <h1 className="font-extrabold text-2xl md:text-3xl text-white mt-1">{event.title}</h1>
                        <p className="mt-2 text-gray-200">{event.description}</p>
                        <p className="font-bold text-gray-300 mt-4">Hosted By: <span className="text-white">{event.hostedBy}</span></p>
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
    <div>
      <Logoutnavbar/>
      {/* <PopUp/> */}
    
      {currentEvents}
      <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={eventsCount}
            onPageChange={changePage}
            containerClassName="flex justify-center space-x-2 my-6"
            pageClassName="px-3 py-1 border rounded-lg hover:bg-blue-100"
            pageLinkClassName="text-gray-700"
            previousClassName="px-3 py-1 border rounded-lg bg-blue-300 hover:bg-green-100"
            nextClassName="px-3 py-1 border rounded-lg bg-blue-300 hover:bg-green-100"
            disabledClassName="opacity-50 cursor-not-allowed"
            activeClassName="bg-blue-500 text-white px-3 py-1 rounded-lg"
    />
    <Footer/>
    </div>
  )
}