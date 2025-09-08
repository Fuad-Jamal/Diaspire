import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function MentorRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const mentorId = localStorage.getItem("mentorId");
      const role = localStorage.getItem("userRole");

      console.log("Mentor ID used for query:", mentorId);

      if (role !== "professional") {
        console.warn("User is not a mentor. Skipping request fetch.");
        return;
      }

      if (!mentorId) {
        console.warn("No mentorId found in localStorage.");
        return;
      }

      try {
        const q = query(collection(db, "requests"), where("mentorId", "==", mentorId));
        const snapshot = await getDocs(q);
        console.log("Query snapshot size:", snapshot.size);
        console.log("Fetched requests:", snapshot.docs.map(doc => doc.data()));

        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Incoming Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="bg-white p-4 rounded shadow">
              <p><strong>{req.menteeName}</strong> wants to connect</p>
              <p>Email: {req.menteeEmail}</p>
              <p>
                Requested on:{" "}
                {req.timestamp?.seconds
                  ? new Date(req.timestamp.seconds * 1000).toLocaleString()
                  : "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MentorRequests;
