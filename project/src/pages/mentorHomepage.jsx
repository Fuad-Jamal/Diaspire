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
  getDoc,
  addDoc
} from "firebase/firestore";

export default function MentorWithMentees() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [loading, setLoading] = useState(true)
  const [unreadCounts, setUnreadCounts] = useState({});

  const mentorsPerPage = 3;
  const mentorId = localStorage.getItem("mentorId");

  useEffect(() => {
  const fetchAllData = async () => {
    const mentorsRes = await fetch("/src/data/registeredMentors.json");
    const mentorsData = await mentorsRes.json();
    setMentors(mentorsData);

    if (!mentorId) return;
    setLoading(true);

    const connectionsQuery = query(
      collection(db, "connections"),
      where("mentorId", "==", mentorId)
    );

    const connectionsSnapshot = await getDocs(connectionsQuery);
    const menteeIds = connectionsSnapshot.docs.map(doc => doc.data().menteeId);

    const menteeProfiles = await Promise.all(
      menteeIds.map(async (menteeId) => {
        const menteeDoc = await getDoc(doc(db, "mentees", menteeId));
        if (menteeDoc.exists()) {
          const data = menteeDoc.data();
          return {
            id: menteeId,
            name: data.name || "—",
            profession: data.profession || "Mentee",
            careerInterest: data.careerInterest || "Student"
          };
        } else {
          return null;
        }
      })
    );

    const filteredMentees = menteeProfiles.filter(Boolean);
    setMentees(filteredMentees);

    const unreadMap = {};
    for (const mentee of filteredMentees) {
      const conversationId = [mentorId, mentee.id].sort().join("_");
      const unreadQuery = query(
        collection(db, "messages"),
        where("conversationId", "==", conversationId),
        where("receiverId", "==", mentorId)
      );

      const snapshot = await getDocs(unreadQuery);
      const unread = snapshot.docs.filter(
        doc => !(doc.data().readBy || []).includes(mentorId)
      );
      unreadMap[mentee.id] = unread.length;
    }

    setUnreadCounts(unreadMap);
    setLoading(false);
  };

  fetchAllData();
}, []);



  const firstMentee = mentees[0];

  const currentPage = pageNumber * mentorsPerPage;
  const currentMentors = mentors.slice(currentPage, currentPage + mentorsPerPage);
  const mentorsCount = Math.ceil(mentors.length / mentorsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleAcceptRequest = async (menteeId) => {
  try {
    await addDoc(collection(db, "connections"), {
      mentorId,
      menteeId,
      acceptedAt: new Date()
    });

    const menteeRef = doc(db, "mentees", menteeId);
    const menteeSnap = await getDoc(menteeRef);

    if (!menteeSnap.exists()) {
      await setDoc(menteeRef, {
        name: "Unnamed",
        profession: "Student",
        careerInterest: "Undeclared"
      });
    }

    alert("Mentee accepted!");
    window.location.reload();
  } catch (err) {
    console.error("Error accepting mentee:", err);
    alert("Failed to accept mentee.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gray-100 m-0 flex justify-center pr-2">
        <Dashboard firstMentee={firstMentee} />
        <div className="bg-white px-4 w-[50%] mx-auto py-3">
          <h1 className="text-3xl font-medium">
            Welcome {localStorage.getItem("userFirstName") || "Mentor"} 🎉
          </h1>

          <div className="flex-col space-y-4 gap-6 max-w-5xl mx-auto mt-6 p-4 rounded-xl">
            <h2 className="text-2xl font-bold mt-10 text-gray-800">
              My mentees
            </h2>
            {loading ? (
  <p className="text-gray-500">Loading mentees...</p>
) : mentees.length === 0 ? (
  <p className="text-gray-600">You haven’t accepted any mentees yet.</p>
) : (
  mentees.map((mentee, idx) => (
    <div
      key={idx}
      className="p-6 bg-gray-200 shadow-lg rounded-xl hover:scale-105 transition-transform flex justify-between"
    >
      <span>
        <h3 className="font-bold text-lg text-gray-800">{mentee.name}</h3>
        <p className="text-gray-600">{mentee.profession}</p>
        <p className="text-blue-600 font-medium">
          Career: {mentee.careerInterest}
        </p>
      </span>
      <button
  onClick={() => {
    const conversationId = [mentorId, mentee.id].sort().join("_");
    window.location.href = `/chat/${conversationId}`;
  }}
  className="relative my-4 bg-green-200 text-green-700 px-4 py-1 rounded-lg hover:bg-green-700 hover:text-white"
>
  Message
  {unreadCounts[mentee.id] > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
      {unreadCounts[mentee.id]}</span>
)}
</button>

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
            <span className="ml-12">
              <button
                onClick={() => handleAcceptRequest(mentors[0]?.id)}
                className="bg-green-200 rounded-lg p-1 text-blue-500 mx-2"
              >
                Accept
              </button>
              <button className="bg-gray-200 rounded-lg p-1 mx-2">Decline</button>
            </span>
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
