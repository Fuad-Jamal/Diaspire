import Navbar from "../components/navbar"
import Footer from "../components/footer"


function Resources (){
    
return <div>
    
    <Navbar/>
    <div className=" bg-gray-100 pb-48">
        <h1 className="lg:text-3xl pt-12 font-bold text-center">Resource Library</h1>
        <p className="text-center text-xl">Curated content to help you succeed.</p>
        {/* first three cards */}
        <div className="flex">
            <div className="bg-white rounded-xl w-[270px] text-center px-8 py-8 ml-[234px] mt-24 transform transition-transform duration-300
               hover:-translate-y-4">
                <h1 className="font-bold text-lg  ">Choose your career</h1>
                <p>By Ali Abbadah </p>
                <div className="bg-gray-300 px-8 py-1 mt-4 hover:text-white hover:bg-blue-600  rounded-lg w-[204px] text-center">
                    <a href="https://youtu.be/O3m14PVOq_g">View Resources</a>
                </div>
            </div>
            <div className="bg-white rounded-xl w-[270px] text-center px-8 py-8 ml-[34px] mt-24 transform transition-transform duration-300
               hover:-translate-y-4">
                <h1 className="font-bold text-lg  ">CV & Cover Letter Template</h1>
                <p>By David Muhinz</p>
                <div className="bg-gray-300 px-8 py-1 mt-4 hover:text-white hover:bg-blue-600  rounded-lg w-[204px] text-center">
                    <a href="https://www.indeed.com/career-advice/cover-letter-samples">View Resources</a>
                </div>
            </div>
            <div className="bg-white rounded-xl w-[270px] text-center px-8 py-8 ml-[34px] mt-24 transform transition-transform duration-300
               hover:-translate-y-4">
                <h1 className="font-bold text-lg  "> JavaScript</h1>
                <p>By Careb Can</p>
                <div className="bg-gray-300 px-8 py-1 mt-4 hover:text-white hover:bg-blue-600  rounded-lg w-[204px] text-center">
                    <a href="https://youtu.be/W6NZfCO5SIk">View Resources</a>
                </div>
            </div>
        </div>

        {/* second three cards */}
        <div className="flex">
            <div className="bg-white rounded-xl w-[270px] text-center px-8 py-8 ml-[234px] mt-24 transform transition-transform duration-300
               hover:-translate-y-4">
                <h1 className="font-bold text-lg  ">Financial Literacy</h1>
                <p>By David Muhinz</p>
                <div className="bg-gray-300 px-8 py-1 mt-4 hover:text-white hover:bg-blue-600  rounded-lg w-[204px] text-center">
                    <a href="https://corporatefinanceinstitute.com/resources/wealth-management/financial-literacy/#:~:text=Start%20Free-,What%20is%20Financial%20Literacy%3F,to%20as%20being%20financially%20illiterate.">View Resources</a>
                </div>
            </div>
            <div className="bg-white rounded-xl w-[270px] text-center px-8 py-8 ml-[34px] mt-24 transform transition-transform duration-300
               hover:-translate-y-4">
                <h1 className="font-bold text-lg  "> Critical & Cognitive Skills</h1>
                <p>By Jane Inema</p>
                <div className="bg-gray-300 px-8 py-1 mt-4 hover:text-white hover:bg-blue-600  rounded-lg w-[204px] text-center">
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK84224/">View Resources</a>
                </div>
            </div>
            <div className="bg-white rounded-xl w-[270px] text-center px-8 py-8 ml-[34px] mt-24 transform transition-transform duration-300
               hover:-translate-y-4">
                <h1 className="font-bold text-lg  ">TailwindCss</h1>
                <p>By Can Sanem</p>
                <div className="bg-gray-300 px-8 py-1 mt-4 hover:text-white hover:bg-blue-600  rounded-lg w-[204px] text-center">
                    <a href="https://tailwindcss.com/docs/installation/using-vite">View Resources</a>
                </div>
            </div>
        </div>
    </div>
     <Footer/>

</div>
}
export default Resources