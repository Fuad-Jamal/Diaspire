import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  getDoc,
  setDoc
} from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MentorWithMentees() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [mentorName, setMentorName] = useState("");
  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const mentorsPerPage = 3;
  const mentorId = localStorage.getItem("mentorId");
  const navigate = useNavigate();

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
        const q = query(collection(db, "connections"), where("mentorId", "==", mentorId), where("status", "==", "accepted"));
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

  const handleSchedule = async (menteeId) => {
    if (!selectedDate) return;
    const sessionId = `${mentorId}_${menteeId}`;
    try {
      await setDoc(doc(db, "sessions", sessionId), {
        mentorId,
        menteeId,
        scheduledAt: selectedDate,
        createdAt: new Date()
      });
      alert("Session scheduled!");
      setShowCalendarFor(null);
      setSelectedDate(null);
    } catch (err) {
      console.error("Error scheduling session:", err);
    }
  };

  const currentPage = pageNumber * mentorsPerPage;
  const currentMentors = mentors.slice(currentPage, currentPage + mentorsPerPage);
  const mentorsCount = Math.ceil(mentors.length / mentorsPerPage);
  const changePage = ({ selected }) => setPageNumber(selected);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gray-100 m-0 flex justify-center pr-2">
        <Dashboard firstMentee={mentees[0]} />
        <div className="bg-gray-100 w-[50%] mx-auto py-3">
          <h1 className="text-3xl font-medium">
            Welcome {mentorName || "Mentor"} 🎉
          </h1>

          <div className="mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">My Mentees</h2>
            {mentees.length === 0 ? (
  <p className="text-gray-600">No accepted mentees found. Try refreshing or checking your connections.</p>
) : (
              mentees.map((mentee, idx) => (
                <div key={idx} className="relative bg-gray-200 shadow-md rounded-lg p-5 mb-4">
                  <div className="flex justify-between items-center">
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
                          navigate(`/chat/${conversationId}`);
                        }}
                        className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                      >
                        Message
                      </button>
                      <button
                        onClick={() => setShowCalendarFor(mentee.id)}
                        className="px-4 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 transition"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>

                  {showCalendarFor === mentee.id && (
                    <div className="absolute z-50 mt-2 bg-white p-4 rounded shadow-lg w-[300px]">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="border p-2 rounded w-full"
                      />
                      <button
                        onClick={() => handleSchedule(mentee.id)}
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Confirm Session
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
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
          <ImpactChart />
        </section>
      </div>
      <Footer />
    </div>
  );
}
