import { useEffect, useState, React } from "react";
import Navbar from "../components/navbar"
import ReactPaginate from "react-paginate";
import Footer from "../components/footer";
import AddJobForm from "../data/job-form";
import UploadJobs from "../data/jobs-upload";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AddJob from "../components/add-job";

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

    useEffect(() => {
  const fetchJobs = async () => {
    const jobsCollection = collection(db, "jobs");
    const jobsSnapshot = await getDocs(jobsCollection);
    const jobsList = jobsSnapshot.docs.map(doc => doc.data());
    setJobs(jobsList);
  };
  fetchJobs();
}, []);

const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-[url(/src/assets/jobsBG.png)]">
      <Navbar/>
      {/* Job board */}
      <div className="text-white font-bold text-3xl text-center m-auto my-4">
                  <h1 >Job Board</h1>
        <p className="font-normal text-lg">Discover your next career opportunity.</p>
      
      </div>
      <button
  className="absolute top-36 right-8 bg-blue-600 hover:bg-green-500 text-white rounded-full shadow-lg p-4 flex items-center justify-center z-50"
  onClick={() => setShowModal(true)}
  
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  <span className="mr-2 font-bold text-lg">Add Job</span>
</button>
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
      {/* <AddJobForm/> */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-md">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={() => setShowModal(false)}
        aria-label="Close"
      >
        &times;
      </button>
      <AddJob onClose={() => setShowModal(false)} />
    </div>
  </div>
)}
    </div>
  )
}


