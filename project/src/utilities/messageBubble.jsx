import React from "react";

const MessageBubble = ({ text, isSender, timestamp }) => {
  const timeString = timestamp?.seconds
    ? new Date(timestamp.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${
          isSender
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{text}</p>
        {timeString && (
          <p className="text-xs text-gray-400 mt-1 text-right">{timeString}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
