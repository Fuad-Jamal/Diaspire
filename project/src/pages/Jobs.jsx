import { useEffect, useState, React } from "react";
import Navbar from "../components/navbar";
import ReactPaginate from "react-paginate";
import Footer from "../components/footer";
import AddJobForm from "../data/job-form";
import UploadJobs from "../data/jobs-upload";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AddJob from "../components/add-job";

export default function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const jobsPerPage = 4;
    const currentPage = pageNumber * jobsPerPage;

    const currentJobs = jobs.slice(currentPage, currentPage + jobsPerPage).map((job, index) => {
        return (
            <div 
                key={index} 
                className=" p-6 rounded-xl w-[95%] md:w-[80%] lg:w-[70%] mx-auto my-4 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 100}ms`,background:'linear-gradient(to right, #002F6C, #FDCB58)' }} 
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex-1">
                        <h1 className="font-extrabold text-2xl text-white">{job.jobTitle}</h1>
                        <p className="mt-2 text-gray-700"><span className="text-blue-600 font-bold">Company/Org: </span>{job.companyName}</p>
                        <p className="text-gray-700"><span className="text-blue-600 font-bold">Work Mode: </span>{job.workMode}</p>
                        <p className="font-bold text-gray-500 mt-2">Deadline: {job.deadline}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <span className="bg-gray-200 text-blue-600 font-bold py-2 px-4 rounded-full whitespace-nowrap">{job.jobType}</span>
                        <button className="bg-blue-600 h-12 px-6 rounded-lg font-bold text-white whitespace-nowrap transition-all duration-300 hover:bg-green-500 hover:scale-105">
                            <a href={job.jobLink} target="_blank" rel="noopener noreferrer">View Details</a>
                        </button>
                    </div>
                </div>
            </div> 
        );
    });

    const jobsCount = Math.ceil(jobs.length / jobsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsCollection = collection(db, "jobs");
                const jobsSnapshot = await getDocs(jobsCollection);
                const jobsList = jobsSnapshot.docs.map(doc => doc.data());
                setJobs(jobsList);
            } catch (error) {
                console.error("Failed to fetch jobs from Firebase:", error);
            }
        };
        fetchJobs();
    }, []);

    const [showModal, setShowModal] = useState(false);

    return (
        <div className=" bg-blue-800  bg-cover bg-center bg-no-repeat min-h-screen">
            <Navbar/>
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>

            <div className="text-white font-bold text-center pt-12 mb-8">
                <h1 className="text-4xl">Job Board</h1>
                <p className="font-normal text-lg mt-2">Discover your next career opportunity.</p>
            </div>
            
            <button
                className="absolute top-36 right-4 md:right-8 bg-blue-600 hover:bg-green-500 text-white rounded-full shadow-lg p-3 md:p-4 flex items-center justify-center z-50 transition-all duration-300 hover:scale-105"
                onClick={() => setShowModal(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="ml-2 font-bold hidden md:inline">Add Job</span>
            </button>
            
            <div className="flex flex-col items-center">
                {currentJobs}
            </div>

            <div className="my-8">
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={jobsCount}
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

            <Footer/>
            
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
    );
}