import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp
} from "firebase/firestore";
import MessageBubble from "./utilities/messageBubble";
import MessageInput from "./utilities/messageInput";

function ChatWindow({ mentorId, menteeId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const conversationId = [mentorId, menteeId].sort().join("_");

  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        console.warn("No messages found for:", conversationId);
      }

      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const messageData = {
      conversationId,
      senderId: currentUserId,
      receiverId: currentUserId === mentorId ? menteeId : mentorId,
      text,
      timestamp: Timestamp.now()
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      console.log("Message sent:", messageData);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4 text-lg font-semibold">
        Chat with {currentUserId === mentorId ? "Mentee" : "Mentor"}
      </div>

      <div
        ref={scrollRef}
        className="h-[400px] overflow-y-auto px-6 py-4 space-y-4 bg-gray-50"
      >
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map(msg => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              isSender={msg.senderId === currentUserId}
              timestamp={msg.timestamp}
            />
          ))
        )}
      </div>

      <div className="border-t px-6 py-4 bg-white">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow;
