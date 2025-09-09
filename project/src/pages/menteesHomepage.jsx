import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ReactPaginate from "react-paginate";
import ProgressCard from "../components/progressSection";
import Dashboard from "../components/MenteeDashBoard";
import HelpCardSection from "../components/helpCardSection";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";

export default function MenteeWithMentors() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [assignedMentor, setAssignedMentor] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null);

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

    const fetchAssignedMentor = async () => {
      const menteeId = localStorage.getItem("menteeId");
      if (!menteeId) return;

      const q = query(
        collection(db, "connections"),
        where("menteeId", "==", menteeId)
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) return;

      const connection = snapshot.docs[0].data();
      const mentorRef = doc(db, "mentors", connection.mentorId);
      const mentorSnap = await getDoc(mentorRef);

      if (mentorSnap.exists()) {
        setAssignedMentor({ id: connection.mentorId, ...mentorSnap.data() });
      }
    };

    fetchData();
    fetchAssignedMentor();
  }, []);

  if (mentees.length === 0) return <p>Loading...</p>;

  const firstMentee = mentees[0];

  const recommendedMentors = mentors.filter(
    (m) => m.careerInterest === firstMentee.careerInterest
  );

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
      <div className="bg-gray-100 m-0 flex justify-center pr-2">
        <Dashboard firstMentee={firstMentee} />
        <div className="bg-gray-100 w-[50%] mx-auto py-3">
          <h1 className="text-3xl font-medium">
            Welcome {localStorage.getItem("menteeFirstName") || "Mentee"}!
          </h1>

          <div className="mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">My Mentor</h2>
            {assignedMentor ? (
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
                    {assignedMentor?.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {assignedMentor?.name || "Mentor Name"}
                    </h3>
                    <p className="text-gray-600">{assignedMentor?.profession || "Mentor"}</p>
                    <p className="text-blue-600 font-medium">
                      Career: {assignedMentor?.careerInterest || "Program Manager"}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const conversationId = [assignedMentor.id, localStorage.getItem("menteeId")].sort().join("_");
                      window.location.href = `/chat/${conversationId}`;
                    }}
                    className="bg-green-200 text-green-700 px-4 py-1 rounded-lg hover:bg-green-700 hover:text-white"
                  >
                    Message
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">You don’t have a mentor assigned yet.</p>
            )}
          </div>

          <div className="flex-col space-y-4 gap-6 max-w-5xl mx-auto mt-6 bg-white p-4 rounded-xl">
            <h2 className="text-2xl font-bold mt-10 text-gray-800">
              Recommended Mentors
            </h2>
            {currentMentors.map((mentor, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-200 shadow-lg rounded-xl hover:scale-105 transition-transform flex justify-between"
              >
                <span>
                  <h3 className="font-bold text-lg text-gray-800">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600">{mentor.profession}</p>
                  <p className="text-blue-600 font-medium">
                    Career: {mentor.careerInterest}
                  </p>
                </span>
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="my-4 bg-gray-400 text-blue-700 px-4 py-1 rounded-lg hover:bg-blue-700 hover:text-white"
                >
                  View
                </button>
              </div>
            ))}
          </div>

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

        <section>
          <ProgressCard />
          <HelpCardSection />
        </section>

        {selectedMentor && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
              <button
                onClick={() => setSelectedMentor(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-lg font-bold"
              >
                ❌
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Mentor Details
              </h2>
              <p><span className="font-semibold">Name:</span> {selectedMentor.name}</p>
              <p><span className="font-semibold">Email:</span> {selectedMentor.email}</p>
              <p><span className="font-semibold">Profession:</span> {selectedMentor.profession}</p>
              <p><span className="font-semibold">Career Interest:</span> {selectedMentor.careerInterest}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
