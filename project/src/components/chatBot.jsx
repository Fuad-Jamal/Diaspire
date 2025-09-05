import React, { useState, useRef, useEffect } from 'react';

// FAQ data stored as a JavaScript array of objects.
// This is where you can add your questions and answers.
const faqs = [
  {
    question: "What is the meaning of life?",
    answer: "The meaning of life is a philosophical question about the purpose and significance of living."
  },
  {
    question: "How do you work?",
    answer: "I work by matching your question to a pre-written answer in my database."
  },
  {
    question: "Who created you?",
    answer: "I was created as a simple chatbot example using React and Tailwind CSS."
  },
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces."
  },
  {
    question: "How are you?",
    answer: "I'm a computer program, so I'm always doing great!"
  },
  {
    question: "What is this app for?",
    answer: "This is a simple chatbot demonstration to show how to handle conditional responses based on user input."
  },
];

// The main App component containing all the chatbot logic and UI.
const App = () => {
  // State to store all the chat messages (both user and bot).
  const [messages, setMessages] = useState([]);
  // State to store the current text in the input box.
  const [input, setInput] = useState('');
  // Ref to automatically scroll to the bottom of the chat.
  const chatEndRef = useRef(null);

  // This useEffect hook is used to scroll to the most recent message.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a message when the user clicks the button or presses Enter.
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 1. Add the user's message to the chat.
    setMessages(prevMessages => [...prevMessages, { text: input, from: 'user' }]);

    // Find the best matching answer.
    let foundAnswer = "I'm sorry, I don't understand that question. Try asking something like: 'What is React?'";
    const userQuestion = input.toLowerCase();

    // Loop through the FAQ to find a matching question.
    for (const faq of faqs) {
      if (userQuestion.includes(faq.question.toLowerCase())) {
        foundAnswer = faq.answer;
        break; // Stop searching once a match is found.
      }
    }

    // 2. Add the bot's response to the chat.
    // Use a small delay to make it feel more like a real conversation.
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: foundAnswer, from: 'bot' }]);
    }, 500);

    // 3. Clear the input box.
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Chat header */}
      <header className="flex-shrink-0 mb-4">
        <h1 className="text-3xl font-bold text-center">Simple FAQ Bot</h1>
        <p className="text-center text-sm text-gray-400 mt-1">
          Ask me questions like "What is React?" or "How are you?".
        </p>
      </header>

      {/* Chat messages container */}
      <div className="flex-grow overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`p-3 rounded-lg max-w-lg ${
                msg.from === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-4">
        <div className="flex w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow p-3 rounded-l-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="flex-shrink-0 p-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
