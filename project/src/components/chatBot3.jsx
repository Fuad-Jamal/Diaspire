import { useRef, useEffect, useState } from "react";
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
    {
     question:'what is Diaspire?',
     answer:"Diaspire is a youth empowerment platform designed to connect ambitious African youth with experienced diaspora professionals through meaningful mentorship, career guidance, and global exposure."
    },
    {
        question: 'why choose diaspire?',
        answer:"Diaspire connects African youth with diaspora professionals through tech-driven mentorship, career guidance, and global insight empowering the next generation of confident changemakers."
    }
  ];

  import React from 'react'
  
  export default function ChatBot3() {
    //the state to control message
    const [messages, setMessages] =  useState([]);
    //the state to control input
    const [input,setInput] =useState('');
    //the state to scroll to the end of Chat
    const chatEnd = useRef(null)
    //useEffect to rerun to see teh updated message and call useRef to scroll to bottom
    useEffect(()=>{
        chatEnd.current?.scrollIntoView({behavior:'smooth'})
    },[messages]);

    //Button to handle send message incase it is clicked or Enter key is hit
    const handleSendMessage =(e=>{
        e.preventDefault();
        if(input.trim()==='') return;
        setMessages((prevMessage)=> [...prevMessage,{text:input,from:'user'}]);
        let foundAnswer = 'The asked question is not in the list of frequently asked questions which are the one I answer. Remember to always end question with question mark (?) for me to know if it is question.';
        let inputQuestion = input.toLowerCase();
        //Looping through the FAQs to get teh matching answer
        for (let faq of faqs){
            if(inputQuestion.includes(faq.question.toLowerCase())){
                foundAnswer = faq.answer;
                break;
            }
        }
        //Adding bot response to teh chat
        setTimeout(()=>{
            setMessages(prevMessage=>[...prevMessage,{text:foundAnswer,from:'bot'}])
        },1000);
        setInput('')
    })
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Chat header */}
      <header className="flex-shrink-0 mb-4">
        <h1 className="text-3xl font-bold text-center">FAQ Bot</h1>
        <p className="text-center text-sm text-gray-400 mt-1">
          This chatbot handle the basic questions. To get right answer, ask question with question mark (?).
        </p>
      </header>
      
         {/* Chat message container */}
      <div className="flex-grow overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-inner">
       {messages.map((msg,index)=>(
        <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
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
       <div ref={chatEnd}/>
      </div>
      {/* input form */}
            <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-4">
                <div className="flex w-full">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-grow p-3 rounded-l-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        />
                    <button
                     type="submit"
                     className="flex-shrink-0 p-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-2 transition-all"
                     >Send</button>

                </div>
            </form>
      </div>
    );
  };
  