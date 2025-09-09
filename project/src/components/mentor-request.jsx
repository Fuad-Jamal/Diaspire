import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  limit,
  startAfter
} from "firebase/firestore";

function MentorRequests() {
  const [requests, setRequests] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const mentorId = localStorage.getItem("mentorId");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async (paginate = false) => {
    if (role !== "professional" || !mentorId) return;
    setLoading(true);

    try {
      let q = query(
        collection(db, "requests"),
        where("mentorId", "==", mentorId),
        limit(5)
      );

      if (paginate && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const snapshot = await getDocs(q);
      const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(newLastVisible);

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(prev => paginate ? [...prev, ...data] : data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId, menteeId) => {
    try {
      await updateDoc(doc(db, "requests", requestId), { status: "accepted" });

      await setDoc(doc(db, "connections", `${mentorId}_${menteeId}`), {
        mentorId,
        menteeId,
        acceptedAt: new Date()
      });

      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: "accepted" } : req
        )
      );
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await deleteDoc(doc(db, "requests", requestId));
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (err) {
      console.error("Error declining request:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Incoming Mentorship Requests</h1>
        <p className="text-gray-500 mt-2">Review and respond to mentees who want to connect with you.</p>
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests yet.</p>
      ) : (
        <div className="space-y-6">
          {requests.map(req => (
            <div key={req.id} className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{req.menteeName || "Unnamed Mentee"}</h2>
                <p className="text-sm text-gray-600">{req.menteeEmail || "No email provided"}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Requested on: {req.requestedAt?.toDate().toLocaleString() || "Unknown"}
                </p>

                {req.status === "accepted" && (
                  <div className="flex space-x-2 mt-2">
                    <p className="text-green-600 text-sm font-medium">Accepted ✅</p>
                    <button
                      onClick={() => {
                        const conversationId = [mentorId, req.menteeId].sort().join("_");
                        window.location.href = `/chat/${conversationId}`;
                      }}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                    >
                      Message
                    </button>
                  </div>
                )}
              </div>

              {req.status !== "accepted" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAccept(req.id, req.menteeId)}
                    className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(req.id)}
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {lastVisible && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchRequests(true)}
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

export default MentorRequests;
