import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const sendMentorRequest = async (mentorId) => {
  const menteeName = localStorage.getItem("menteeFullName");
  const menteeEmail = localStorage.getItem("menteeEmail");

  try {
    await addDoc(collection(db, "requests"), {
  mentorId: String(mentorId),
  menteeName,
  menteeEmail,
  timestamp: new Date()
});
    alert("Request sent successfully!");
  } catch (err) {
    console.error("Error sending request:", err);
    alert("Failed to send request.");
  }
};
export default sendMentorRequest;
