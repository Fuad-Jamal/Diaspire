import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const allResources = [
  { title: "Choose your career", author: "Ali Abbadah" },
  { title: "CV & Cover Letter Template", author: "David Muhinz" },
  { title: "JavaScript", author: "Careb Can" },
  { title: "Financial Literacy", author: "David Muhinz" },
  { title: "Critical & Cognitive Skills", author: "Jane Inema" },
  { title: "TailwindCSS", author: "Can Sanem" },
  { title: "Public Speaking Tips", author: "John Doe" },
  { title: "Advanced React Hooks", author: "Jane Smith" },
  { title: "Networking for Beginners", author: "Kwame Nkrumah" },
  { title: "Time Management Strategies", author: "Aisha Hassan" },
  { title: "Mastering Python", author: "Samuel Tunde" },
  { title: "Career in Data Science", author: "Fatima Noor" },
  { title: "Creative Writing Guide", author: "Chiamaka Obiora" },
  { title: "Building a Personal Brand", author: "Lameck Rwema" },
  { title: "Fundamentals of UI/UX", author: "Nadia Mutoni" },
];

const resourceChoicesData = {
  "Choose your career": [
    { title: "Career Exploration", url: "https://www.indeed.com/career-advice/finding-a-job/career-exploration" },
    { title: "Interview Preparation", url: "https://www.forbes.com/sites/forbescoachescouncil/2021/06/15/10-questions-to-ask-yourself-when-choosing-a-career/?sh=3c8f39c23577" },
    { title: "Building a Professional Network", url: "https://hbr.org/2014/11/how-to-switch-careers-successfully" },
    { title: "Salary Negotiation", url: "https://www.themuse.com/advice/the-modern-job-search-how-to-get-noticed-and-hired" }
  ],
  "CV & Cover Letter Template": [
    { title: "Resume Templates", url: "https://www.resume.io/templates" },
    { title: "Cover Letter Examples", url: "https://www.indeed.com/career-advice/cover-letter-samples" },
    { title: "ATS-friendly Resumes", url: "https://zety.com/blog/ats-resume" },
    { title: "LinkedIn Profile Optimization", url: "https://www.linkedin.com/learning/linkedin-for-students-and-recent-grads" }
  ],
  "JavaScript": [
    { title: "Beginner Tutorials", url: "https://javascript.info/" },
    { title: "Advanced Concepts", url: "https://eloquentjavascript.net/" },
    { title: "ES6 Features", url: "https://www.freecodecamp.org/news/learn-es6-the-ultimate-guide/" },
    { title: "Front-end Frameworks", url: "https://www.freecodecamp.org/news/the-most-popular-javascript-frameworks/" }
  ],
  "Financial Literacy": [
    { title: "Budgeting", url: "https://www.thebalance.com/how-to-create-a-budget-4158913" },
    { title: "Investing", url: "https://www.investopedia.com/investing-basics-4427775" },
    { title: "Saving Money", url: "https://www.cnbc.com/2021/01/21/how-to-start-saving-money-with-these-simple-steps.html" },
    { title: "Managing Debt", url: "https://studentaid.gov/manage-loans/repayment" }
  ],
  "Critical & Cognitive Skills": [
    { title: "Critical Thinking", url: "https://www.verywellmind.com/how-to-improve-your-critical-thinking-skills-2794767" },
    { title: "Problem Solving", url: "https://asana.com/resources/decision-making-process" },
    { title: "Memory & Focus", url: "https://www.mindtools.com/pages/article/newTDR_59.htm" },
    { title: "Cognitive Biases", url: "https://thedecisionlab.com/biases" }
  ],
  "TailwindCSS": [
    { title: "Basic Setup", url: "https://tailwindcss.com/docs/installation/using-vite" },
    { title: "Responsive Design", url: "https://tailwindcss.com/docs/responsive-design" },
    { title: "Customization", url: "https://tailwindcss.com/docs/adding-custom-styles" },
    { title: "Components", url: "https://tailwindui.com/" }
  ],
  "Public Speaking Tips": [
    { title: "Speech Writing", url: "https://www.artofmanliness.com/skills/public-speaking/how-to-structure-a-speech/" },
    { title: "Overcoming Anxiety", url: "https://www.verywellmind.com/how-to-overcome-public-speaking-anxiety-2795328" },
    { title: "Body Language", url: "https://www.forbes.com/sites/forbescoachescouncil/2018/06/25/11-body-language-mistakes-to-avoid-when-presenting/?sh=3e8b579c2980" },
    { title: "Presentation Skills", url: "https://www.inc.com/rhett-power/7-ways-to-keep-your-audience-engaged-when-you-are-giving-a-presentation.html" }
  ],
  "Advanced React Hooks": [
    { title: "Custom Hooks", url: "https://reactjs.org/docs/hooks-custom.html" },
    { title: "useContext & useReducer", url: "https://dmitripavlutin.com/react-usereducer-vs-usestate/" },
    { title: "Performance Hooks", url: "https://kentcdodds.com/blog/usememo-and-usecallback" },
    { title: "Data Fetching", url: "https://react-query-v3.tanstack.com/guides/overview" }
  ],
  "Networking for Beginners": [
    { title: "Online Networking", url: "https://hbr.org/2018/11/how-to-network-when-you-hate-networking" },
    { title: "In-Person Events", url: "https://www.forbes.com/sites/forbescoachescouncil/2019/10/21/how-to-master-the-qa-session/?sh=22c4f83b1a2a" },
    { title: "Informational Interviews", url: "https://www.themuse.com/advice/the-modern-job-search-how-to-get-noticed-and-hired" },
    { title: "Building Relationships", url: "https://www.forbes.com/sites/forbescoachescouncil/2021/06/15/10-questions-to-ask-yourself-when-choosing-a-career/?sh=3c8f39c23577" }
  ],
  "Time Management Strategies": [
    { title: "Productivity Techniques", url: "https://www.verywellmind.com/tips-for-effective-time-management-2795054" },
    { title: "Prioritization", url: "https://www.forbes.com/sites/forbescoachescouncil/2021/04/13/10-tips-for-becoming-a-better-public-speaker/?sh=6a6b579c5c1b" },
    { title: "Avoiding Procrastination", url: "https://www.mindtools.com/pages/article/newTDR_59.htm" },
    { title: "Work-Life Balance", url: "https://www.nerdwallet.com/article/banking/how-to-build-an-emergency-fund" }
  ],
  "Mastering Python": [
    { title: "Python Basics", url: "https://www.python.org/doc/essays/blurb/" },
    { title: "Data Science Libraries", url: "https://www.geeksforgeeks.org/javascript-data-structures/" },
    { title: "Web Development", url: "https://www.freecodecamp.org/news/the-most-popular-javascript-frameworks/" },
    { title: "Advanced Topics", url: "https://nodejs.dev/en/learn/" }
  ],
  "Career in Data Science": [
    { title: "Data Science Roadmap", url: "https://www.coursera.org/articles/career-in-data-science" },
    { title: "Essential Skills", url: "https://www.investopedia.com/personal-finance-4427774" },
    { title: "Job Market Trends", url: "https://www.investopedia.com/investing-basics-4427775" },
    { title: "Portfolio Projects", url: "https://www.cnbc.com/2021/01/21/how-to-start-saving-money-with-these-simple-steps.html" }
  ],
  "Creative Writing Guide": [
    { title: "Storytelling", url: "https://www.masterclass.com/articles/how-to-start-creative-writing" },
    { title: "Character Development", url: "https://www.forbes.com/sites/forbescoachescouncil/2021/08/23/10-steps-to-building-a-personal-brand-from-scratch/?sh=123a3f5a2a22" },
    { title: "Plotting & Structure", url: "https://www.thebalancecareers.com/power-words-for-your-resume-2063806" },
    { title: "Writing Prompts", url: "https://buffer.com/resources/storytelling-for-presentations/" }
  ],
  "Building a Personal Brand": [
    { title: "Defining Your Brand", url: "https://www.forbes.com/sites/forbescoachescouncil/2021/08/23/10-steps-to-building-a-personal-brand-from-scratch/?sh=123a3f5a2a22" },
    { title: "Social Media Strategy", url: "https://www.linkedin.com/learning/linkedin-for-students-and-recent-grads" },
    { title: "Content Creation", url: "https://www.indeed.com/career-advice/career-development/soft-skills" },
    { title: "Online Presence", url: "https://www.indeed.com/career-advice/finding-a-job/career-exploration" }
  ],
  "Fundamentals of UI/UX": [
    { title: "UI vs UX", url: "https://careerfoundry.com/en/blog/ui-design/ui-design-and-ux-design-whats-the-difference/" },
    { title: "Design Principles", url: "https://www.shopify.com/blog/how-to-create-a-portfolio-website" },
    { title: "User Research", url: "https://www.masterclass.com/articles/how-to-start-creative-writing" },
    { title: "Design Tools", url: "https://www.investopedia.com/personal-finance-4427774" }
  ],
};

const ITEMS_PER_PAGE = 6;

function Resources() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allResources.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const resourcesToShow = allResources.slice(startIndex, endIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleViewResources = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleChoiceClick = (choice) => {
    window.open(choice.url, '_blank');
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800">Resource Library</h1>
        <p className="text-center text-lg md:text-xl text-gray-600 mt-2">Curated content to help you succeed.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {resourcesToShow.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h1 className="font-bold text-xl text-gray-800">{resource.title}</h1>
              <p className="text-gray-500 text-sm mt-1">By {resource.author}</p>
              <div className="bg-blue-500 mt-6 rounded-lg w-full text-center">
                <button
                  onClick={() => handleViewResources(resource)}
                  className="block w-full py-3 text-white font-bold transition-colors duration-300 hover:bg-blue-600"
                >
                  View Resources
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span className="text-lg font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <Footer />

      {/* The Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose a topic:</h2>
              <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {(resourceChoicesData[selectedResource?.title] || []).map((choice, index) => (
                  <li key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                    <button
                      onClick={() => handleChoiceClick(choice)}
                      className="block w-full text-left font-medium transition-colors text-blue-600 hover:underline"
                    >
                      {choice.title}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          </div>
        </div>
      )}

      {/* Custom animation style block */}
      <style jsx>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Resources;