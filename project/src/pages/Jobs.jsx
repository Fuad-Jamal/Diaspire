import { useEffect, useState, React } from "react";
import Navbar from "../components/navbar"
import ReactPaginate from "react-paginate";
import Footer from "../components/footer";

export default function Jobs() {

    const [jobs, setJobs] = useState([]);
    //state to hold the page number
    const [pageNumber, setPageNumber] = useState(0)
    //Number of items to be on single page
    const jobsPerPage = 4;
    //Current page
    const currentPage = pageNumber* jobsPerPage;
    //rule to show current items
    const currentJobs = jobs.slice(currentPage,currentPage +jobsPerPage).map((job,index)=>{
        return(
          <div key={index} className="py-2 bg-white rounded-xl w-[70%] flex px-8 justify-between m-6 relative z-0 hover:z-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl mx-auto">
                <div className="max-w-[70%] my-auto">
                    <h1 className="font-extrabold text-xl text-slate-700">{job.jobTitle}</h1>
                    <p><span className="text-blue-500 font-bold">Company/Org:  </span>{job.companyName}</p>
                    <p><span className="text-blue-500 font-bold">Work Mode: </span>{job.workMode}</p>
                    <p className="font-bold text-gray-500">Deadline: {job.deadline}</p>
                </div>
                <button className="bg-gray-300 h-10 px-4 ml-96 rounded-lg text-blue-600 my-auto">{job.jobType}</button>
                <button className="bg-blue-600 h-10 px-4 rounded-lg hover:bg-green-500 font-bold text-white my-auto"><a href={job.jobLink} target="blank">View Details</a></button>

          </div>  
        )
    });
    //counting the number of page in case total number of jobs are odd
    const jobsCount = Math.ceil(jobs.length/jobsPerPage);
    //function to change Page on click
    const changePage = ({selected})=>{
        setPageNumber(selected)

    }

    useEffect(()=>{
        const fetchJobs = async()=>{
            const results = await fetch('/src/data/jobs.json');
        const data = await results.json();
        setJobs(data);
        };
        fetchJobs();
    },[]);

  return (
    <div className="bg-[url(/src/assets/jobsBG.png)]">
      <Navbar/>
      {/* Job board */}
      <div className="text-white font-bold text-3xl text-center m-auto my-4">
        <h1 >Job Board</h1>
        <p className="font-normal text-lg">Discover your next career opportunity.</p>
      </div>
      {currentJobs}
      <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={jobsCount}
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


