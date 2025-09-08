import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const sendMessage = async (conversationId, senderId, receiverId, text) => {
  if (!text.trim()) return;

  try {
    await addDoc(collection(db, "messages"), {
      conversationId,
      senderId,
      receiverId,
      text,
      timestamp: Timestamp.now()
    });
  } catch (err) {
    console.error("Error sending message:", err);
  }
};
