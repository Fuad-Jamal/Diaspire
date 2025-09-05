
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ReactPaginate from "react-paginate";
import ImpactChart from "../components/impactChart";
import Dashboard from "../components/MentorDashBoard";


export default function MentorWithMentees() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null); // for popup

  const mentorsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      let menteesRes = await fetch("/src/data/registeredMentees.json");
      let menteesData = await menteesRes.json();
      setMentees(menteesData);

      let mentorsRes = await fetch("/src/data/registeredMentors.json");
      let mentorsData = await mentorsRes.json();
      setMentors(mentorsData);
    };

    fetchData();
  }, []);

  if (mentees.length === 0) return <p>Loading...</p>;

  const firstMentee = mentees[0];

  // filter mentors by career interest
  const recommendedMentors = mentors.filter(
    (m) => m.careerInterest === firstMentee.careerInterest
  );

  // pagination calculations
  const currentPage = pageNumber * mentorsPerPage;
  const currentMentors = recommendedMentors.slice(
    currentPage,
    currentPage + mentorsPerPage
  );
  const mentorsCount = Math.ceil(recommendedMentors.length / mentorsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
    {/* Parent division */}
    <div className="bg-gray-100 m-0 flex justify-center pr-2">
    {/* Dashboard import */}
    <Dashboard firstMentee ={firstMentee}/>
    
     {/* Mentee and recommended mentors parent */}
     <div className="bg-white px-4 w-[50%] mx-auto py-3">
       {/* Mentee Card */}
<h1 className="text-3xl font-medium">
  Welcome {localStorage.getItem("userFirstName") || "Mentor"} 🎉
</h1>

{/* My mentees section */}
<div className="flex-col space-y-4 gap-6 max-w-5xl mx-auto mt-6 p-4 rounded-xl">
      <h2 className=" text-2xl font-bold mt-10 text-gray-800">
        My mentees
      </h2>
        {currentMentors.map((mentor, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-200 shadow-lg rounded-xl hover:scale-105 transition-transform flex justify-between"
          >
            <span>
            <h3 className="font-bold text-lg text-gray-800">
              {mentor.fullName}
            </h3>
            <p className="text-gray-600">{mentor.profession}</p>
            <p className="text-blue-600 font-medium">
              Career: {mentor.careerInterest}
            </p>
            </span>
            <button
              onClick={() => setSelectedMentor(mentor)}
              className="my-4 bg-green-200 text-green-700 px-4 py-1 rounded-lg hover:bg-green-700 hover:text-white"
            >
              Message
            </button>
          </div>
        ))}
      </div>



       <p className="text-lg font-bold ml-4 mt-4">Mentorship requests</p>
       <div className=" mx-auto mt-8 p-6 bg-gray-300 rounded-xl shadow-lg ">
        
        <span className="flex gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
          {mentors[0]?mentors[0].fullName.split(' ')[0][0]:'Loading'}
        </div>
        <span>
        <p className="font-semibold">{mentors[0]?mentors[0].fullName.split(' ')[0]:'Loading'}{" "}{mentors[0]?mentors[0].fullName.split(' ')[1]:'Loading'}</p>
        <p className="text-gray-600 mb-4">{mentors[0]?mentors[0].profession:'Loading'}</p>
        </span>
        </span>
        {/* button section */}
        <span className="ml-12">
        <button className="bg-green-200 rounded-lg p-1 text-blue-500 mx-2">Accept</button>
        <button className="bg-gray-200 rounded-lg p-1 mx-2">Decline</button>
        </span>
    
        
      </div>

      {/* Recommended Mentors */}
      


      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={mentorsCount}
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
     {/* Progress and help card section */}
    <section>
     <ImpactChart/>
    
    </section>

      {/* Mentor Popup */}
      {selectedMentor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-lg font-bold"
            >
              ❌
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Mentor Details
            </h2>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedMentor.fullName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {selectedMentor.email}
            </p>
            <p>
              <span className="font-semibold">Profession:</span>{" "}
              {selectedMentor.profession}
            </p>
            <p>
              <span className="font-semibold">Career Interest:</span>{" "}
              {selectedMentor.careerInterest}
            </p>
          </div>
        </div>
      )}
    </div>

      <Footer />
    </div>
  );
}
