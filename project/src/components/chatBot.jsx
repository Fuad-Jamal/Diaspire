import { useRef, useEffect, useState,React } from "react";
import faqs  from '/src/data/faqs.json';


  
  export default function ChatBot() {
    //the state to control message
    const [messages, setMessages] =  useState([]);
    //the state to control input
    const [input,setInput] =useState('');
    //the state to scroll to the end of Chat
    const chatEnd = useRef(null)
    //state to check if chat is open or closed
    const [isOpen, setIsOpen] = useState(false);
    //useEffect to rerun to see teh updated message and call useRef to scroll to bottom
    useEffect(()=>{
        chatEnd.current?.scrollIntoView({behavior:'smooth'})
    },[messages]);

    //Button to handle send message incase it is clicked or Enter key is hit
    const handleSendMessage =(e=>{
        e.preventDefault();
        if(input.trim()==='') return;
        setMessages((prevMessage)=> [...prevMessage,{text:input,from:'user'}]);
        let foundAnswer = "The asked question is not in the list of frequently asked questions which are the one I answer. Remember to always end question with question mark (?) for me to know if it is question. For more help, write to 'supportdesk@diaspire.ac.rw'";
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
        <div className="fixed bottom-4 right-4 z-50">{isOpen?
        (<div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Chat header */}
      <header className="flex-shrink-0 mb-4">
        <h1 className="text-3xl font-bold text-center">FAQ Bot</h1>
        <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        <p className="text-left text-sm text-gray-400 mt-1">
          This chatbot handles the basic questions. To get right answer, <br /> copy the question by one and paste it chat or write it as it is with question mark (?).
          <br /> Don't mind about textcase
        </p>
      </header>
      
         {/* Chat message container */}
      <div className="flex-grow overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-inner">
        <div className='block bg-gray-400 h-40 overflow-y-auto  whitespace-nowrap border border-gray-300 my-4'>
          <ul>{faqs.slice(1).map((value,index)=>{
            return <li key={index}>{index+1}{'.'}{value.question}</li>
          })}</ul>
        </div>
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
      ):(
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
      </div>
    );
  };
  