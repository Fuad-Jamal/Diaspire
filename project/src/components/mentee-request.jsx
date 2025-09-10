import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  limit,
  startAfter
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function MenteeRequests() {
  const [requests, setRequests] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const menteeEmail = localStorage.getItem("menteeEmail");
  const menteeId = localStorage.getItem("menteeId");

  const fetchRequestsWithMentorInfo = async (paginate = false) => {
    if (!menteeEmail) return;
    setLoading(true);

    try {
      let q = query(
        collection(db, "requests"),
        where("menteeEmail", "==", menteeEmail),
        limit(5)
      );

      if (paginate && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const snapshot = await getDocs(q);
      const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(newLastVisible);

      const enrichedRequests = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const requestData = docSnap.data();
          const mentorRef = doc(db, "mentors", requestData.mentorId);
          const mentorSnap = await getDoc(mentorRef);

          let mentorInfo = {
            name: "Unknown Mentor",
            title: "",
            category: ""
          };

          if (mentorSnap.exists()) {
            const data = mentorSnap.data();
            mentorInfo = {
              name: data.name || "Unnamed Mentor",
              title: data.title || "",
              category: data.category || ""
            };
          }

          return {
            id: docSnap.id,
            ...requestData,
            mentor: mentorInfo
          };
        })
      );

      setRequests(prev => paginate ? [...prev, ...enrichedRequests] : enrichedRequests);
    } catch (err) {
      console.error("Error fetching mentee requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestsWithMentorInfo();
  }, []);

  const handleCancelRequest = async (id) => {
    try {
      await deleteDoc(doc(db, "requests", id));
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      console.error("Error cancelling request:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
    <button
  onClick={() => navigate(-1)}
  className="text-sm px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
>
  ← Go Back
</button>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Mentorship Requests</h1>
        <p className="text-gray-500 mt-2">Track and manage the requests you've sent to mentors.</p>
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t sent any requests yet.</p>
      ) : (
        <div className="space-y-6">
          {requests.map(req => (
            <div key={req.id} className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{req.mentor.name}</h2>
                <p className="text-sm text-gray-600">{req.mentor.title} • {req.mentor.category}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Sent on: {req.timestamp?.seconds ? new Date(req.timestamp.seconds * 1000).toLocaleString() : "Unknown"}
                </p>
                {req.status === "accepted" && (
                  <p className="text-green-600 text-sm mt-2 font-medium">Accepted ✅</p>
                )}
              </div>

              {req.status === "accepted" ? (
                <button
                  onClick={() => {
                    const conversationId = [req.mentorId, menteeId].sort().join("_");
                    window.location.href = `/chat/${conversationId}`;
                  }}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                >
                  Message
                </button>
              ) : (
                <button
                  onClick={() => handleCancelRequest(req.id)}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {lastVisible && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchRequestsWithMentorInfo(true)}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default MenteeRequests;
