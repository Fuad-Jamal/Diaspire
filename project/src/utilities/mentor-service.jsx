// src/services/mentorService.js
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const mentorCollection = collection(db, "mentors");

// Fetch all mentors
export async function fetchMentors() {
  const snapshot = await getDocs(mentorCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Add a mentor
export async function addMentor(data) {
  await addDoc(mentorCollection, data);
}
