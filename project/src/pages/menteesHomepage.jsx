
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ReactPaginate from "react-paginate";

export default function MenteeWithMentors() {
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
    <div className="bg-orange-300 m-0">
      
     {/* Mentee and recommended mentors parent */}
     <div className="bg-green-400 w-[40%] mx-auto">
       {/* Mentee Card */}
       <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Mentee Information
        </h2>
        <p className="font-semibold">{firstMentee.fullName}</p>
        <p className="text-gray-600">{firstMentee.email}</p>
        <p className="text-gray-600">{firstMentee.educationLevel}</p>
        <p className="text-blue-600 font-medium">
          Career Interest: {firstMentee.careerInterest}
        </p>
      </div>

      {/* Recommended Mentors */}
      <h2 className="text-center text-2xl font-bold mt-10 text-gray-800">
        Recommended Mentors
      </h2>

      <div className="flex-col space-y-4 gap-6 max-w-5xl mx-auto mt-6 bg-blue-700">
        {currentMentors.map((mentor, idx) => (
          <div
            key={idx}
            className="p-6 bg-white shadow-lg rounded-xl hover:scale-105 transition-transform flex justify-between"
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
              className="my-4 bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
            >
              View
            </button>
          </div>
        ))}
      </div>

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
