import { collection, addDoc, Timestamp } from "firebase/firestore";
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
    alert("Request sent successfully!");
  } catch (err) {
    console.error("Error sending request:", err);
    alert("Failed to send request.");
  }
};

export default sendMentorRequest;
