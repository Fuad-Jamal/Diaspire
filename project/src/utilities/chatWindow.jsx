import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import MessageBubble from "../utilities/messageBubble";
import MessageInput from "../utilities/messageInput";

function ChatWindow({ mentorId, menteeId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const conversationId = [mentorId, menteeId].sort().join("_");

  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-black flex flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-3xl bg-gray-950 rounded-2xl shadow-2xl border border-indigo-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-indigo-800 border-b border-indigo-600">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-indigo-300 transition duration-200"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold tracking-wide">
            Chat with {currentUserId === mentorId ? "Mentee" : "Mentor"}
          </h2>
          <div className="w-6" /> {/* Spacer to balance layout */}
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800"
        >
          {loading ? (
            <p className="text-center text-indigo-300 animate-pulse">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-indigo-300">No messages yet. Start the conversation!</p>
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

        {/* Input */}
        <div className="border-t border-indigo-700 px-6 py-4 bg-gray-950">
          <MessageInput onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
