import React from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "./chatWindow.jsx";

function ChatWrapper() {
  const { conversationId } = useParams();
  const currentUserId =
    localStorage.getItem("mentorId") || localStorage.getItem("menteeId");

  const [id1, id2] = conversationId.split("_");
  const mentorId = id1.startsWith("mentor") ? id1 : id2;
  const menteeId = id1.startsWith("mentee") ? id1 : id2;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <ChatWindow
        mentorId={mentorId}
        menteeId={menteeId}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default ChatWrapper;
