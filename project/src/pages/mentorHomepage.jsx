import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ReactPaginate from "react-paginate";
import ImpactChart from "../components/impactChart";
import Dashboard from "../components/MentorDashBoard";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";


export default function MentorWithMentees() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorName, setMentorName] = useState("");

  const mentorsPerPage = 3;
  const mentorId = localStorage.getItem("mentorId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorsRes = await fetch("/src/data/registeredMentors.json");
        const mentorsData = await mentorsRes.json();
        setMentors(mentorsData);
      } catch (err) {
        console.error("Error loading mentors data:", err);
      }
    };

    const fetchMentorName = async () => {
      if (!mentorId) return;
      try {
        const docRef = doc(db, "mentors", mentorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fullName = docSnap.data().fullName || docSnap.data().name || "Mentor";
          const firstName = fullName.split(" ")[0];
          setMentorName(firstName);
        }
      } catch (err) {
        console.error("Error fetching mentor name:", err);
      }
    };

    const fetchAcceptedMentees = async () => {
      if (!mentorId) return;
      try {
        const q = query(collection(db, "connections"), where("mentorId", "==", mentorId));
        const snapshot = await getDocs(q);
        const menteeProfiles = await Promise.all(
          snapshot.docs.map(async (connectionDoc) => {
            const menteeId = connectionDoc.data().menteeId;
            const menteeRef = doc(db, "mentees", menteeId);
            const menteeSnap = await getDoc(menteeRef);
            if (menteeSnap.exists()) {
              return { id: menteeId, ...menteeSnap.data() };
            } else {
              console.warn(`No mentee found with ID: ${menteeId}`);
              return null;
            }
          })
        );
        setMentees(menteeProfiles.filter(Boolean));
      } catch (err) {
        console.error("Error fetching accepted mentees:", err);
      }
    };

    fetchData();
    fetchMentorName();
    fetchAcceptedMentees();
  }, []);

  const firstMentee = mentees[0];
  const currentPage = pageNumber * mentorsPerPage;
  const currentMentors = mentors.slice(currentPage, currentPage + mentorsPerPage);
  const mentorsCount = Math.ceil(mentors.length / mentorsPerPage);
  const changePage = ({ selected }) => setPageNumber(selected);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gray-100 m-0 flex justify-center pr-2">
        <Dashboard firstMentee={firstMentee} />
        <div className="bg-gray-100 w-[50%] mx-auto py-3">
          <h1 className="text-3xl font-medium">
            Welcome {mentorName || "Mentor"} 🎉
          </h1>

          <div className="mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">My Mentees</h2>
            {mentees.length === 0 ? (
              <p className="text-gray-600">You haven’t accepted any mentees yet.</p>
            ) : (
              mentees.map((mentee, idx) => (
                <div key={idx} className="bg-gray-200 shadow-md rounded-lg p-5 mb-4 flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
                      {mentee.name ? mentee.name.charAt(0) : "?"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{mentee.name}</h3>
                      <p className="text-gray-600 text-sm">{mentee.profession}</p>
                      <p className="text-blue-600 text-sm font-medium">Career: {mentee.careerInterest}</p>
                      <p className="text-gray-600 text-sm">Goals: {mentee.mentorshipGoals}</p>
                      <p className="text-blue-600 text-sm">Skills: {mentee.skillsToLearn}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        const conversationId = [mentorId, mentee.id].sort().join("_");
                        window.location.href = `/chat/${conversationId}`;
                      }}
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                    >
                      Message
                    </button>
                    <button
                      onClick={() => {
                        window.location.href = `/schedule/${mentorId}/${mentee.id}`;
                      }}
                      className="px-4 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 transition"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <p className="text-lg font-bold ml-4 mt-4">Mentorship requests</p>
<div className="mx-auto mt-8 p-6 bg-gray-300 rounded-xl shadow-lg">
  <span className="flex gap-4">
    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
      {mentors[0] ? mentors[0].fullName.split(" ")[0][0] : "Loading"}
    </div>
    <span>
      <p className="font-semibold">
        {mentors[0] ? mentors[0].fullName.split(" ")[0] : "Loading"}{" "}
        {mentors[0] ? mentors[0].fullName.split(" ")[1] : "Loading"}
      </p>
      <p className="text-gray-600 mb-4">
        {mentors[0] ? mentors[0].profession : "Loading"}
      </p>
    </span>
  </span>
  {/* button section */}
  <span className="ml-12">
    <button className="bg-green-200 rounded-lg p-1 text-blue-500 mx-2">
      Accept
    </button>
    <button className="bg-gray-200 rounded-lg p-1 mx-2">Decline</button>
  </span>
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

        <section>
          <ImpactChart />
        </section>
      </div>
      <Footer />
    </div>
  );
}
