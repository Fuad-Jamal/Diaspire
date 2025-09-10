import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const sendMentorRequest = async (mentorId) => {
  const menteeId = localStorage.getItem("menteeId");
  const menteeName = localStorage.getItem("menteeFullName");
  const menteeEmail = localStorage.getItem("menteeEmail");

  if (!mentorId || !menteeId || !menteeName || !menteeEmail) {
    alert("Missing required information. Please log in again.");
    return;
  }

  try {
    // Check if a request already exists
    const existingQuery = query(
      collection(db, "requests"),
      where("mentorId", "==", mentorId),
      where("menteeId", "==", menteeId)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      alert("You've already sent a request to this mentor.");
      return;
    }

    const requestData = {
      mentorId: String(mentorId),
      menteeId: String(menteeId),
      menteeName,
      menteeEmail,
      status: "pending",
      timestamp: Timestamp.now()
    };

    await addDoc(collection(db, "requests"), requestData);
    console.log("Request sent:", requestData);
    alert("✅ Connection request sent!");
  } catch (err) {
    console.error("Error sending request:", err);
    alert("❌ Failed to send request. Please try again.");
  }
};

export default sendMentorRequest;
