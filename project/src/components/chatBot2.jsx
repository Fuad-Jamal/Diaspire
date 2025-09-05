import { useState } from "react";
import qa from "../data/faq.json";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // store history

  const handleAsk = () => {
    if (!input.trim()) return;

    // check for a matching question in JSON
    const found = qa.find(q =>
      q.question.toLowerCase().includes(input.toLowerCase())
    );

    const answer = found ? found.answer : "Sorry, I don’t know that yet 🤔";

    // update history
    setMessages(prev => [
      ...prev,
      { sender: "You", text: input },
      { sender: "Bot", text: answer }
    ]);

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-2xl shadow bg-gray-50">
      <h2 className="text-xl font-bold text-center mb-4">💬 Simple ChatBot</h2>

      <div className="h-64 overflow-y-auto p-2 mb-3 bg-white border rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "You" ? "text-blue-600" : "text-green-600"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAsk}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
