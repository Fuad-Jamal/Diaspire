import { useEffect, useState, React } from "react";
import Navbar from "../components/navbar"
import ReactPaginate from "react-paginate";

export default function Events() {

    const [events, setEvents] = useState([]);
    //state to hold the page number
    const [pageNumber, setPageNumber] = useState(0)
    //Number of items to be on single page
    const eventsPerPage = 4;
    //Current page
    const currentPage = pageNumber* eventsPerPage;
    //rule to show current items
    const currentEvents = events.slice(currentPage,currentPage +eventsPerPage).map((event,index)=>{
        return(
          <div key={index} className="py-2 bg-white rounded-xl w-[70%] flex px-8 justify-between m-6 relative z-0 hover:z-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl mx-auto">
                <div className="max-w-[70%] my-auto">
                    <h1 className="text-blue-600">{event.type}</h1>
                    <h1 className="font-extrabold text-xl text-slate-700">{event.title}</h1>
                    <p>{event.description}</p>
                    <p className="font-bold">Hosted By: {event.hostedBy}</p>
                    <p className="font-bold text-gray-500">{event.date}</p>
                </div>
                <button className="bg-blue-600 h-10 px-4 rounded-lg hover:bg-green-500 font-bold text-white my-auto"><a href={event.zoomLink} target="blank">Register</a></button>

          </div>  
        )
    });
    //counting the number of page in case total number of events are odd
    const eventsCount = Math.ceil(events.length/eventsPerPage);
    //function to change Page on click
    const changePage = ({selected})=>{
        setPageNumber(selected)

    }

    useEffect(()=>{
        const fetchEvents = async()=>{
            const results = await fetch('/src/data/events.json');
        const data = await results.json();
        setEvents(data);
        };
        fetchEvents();
    },[]);

  return (
    <div className="bg-[url(/src/assets/eventsBG.svg)]">
      <Navbar/>
    
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

    </div>
  )
}

