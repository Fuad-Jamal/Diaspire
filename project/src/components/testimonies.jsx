import {useEffect, useState, React} from 'react'
import ReactPaginate from 'react-paginate'


export default function Testimonies() {
  //state to control the state of testimonies
    const [testimonies, setTestimonies] = useState([]);
  // state to control page to display testimonies
    const [pageNo, setPageNo]= useState(0);
  //number of testimonies per perpage
    const testimoniesPerPage = 3;
  // live page rule to determine it
    const livePage = pageNo * testimoniesPerPage;
  //Rule to set live testimonies to appear on single page
    const liveTestimonies = testimonies.slice(livePage, livePage+testimoniesPerPage).map((testimony,index)=>{
      return (
        <div className="bg-blue-400 mx-auto my-8 rounded-2xl relative z-0 hover:z-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <div className="bg-gray-200 m-5 p-2 w-80 h-96 rounded-b-full relative z-0 hover:z-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <div key={index} className="m-4 h-[72%] w-auto text-center bg-white py-8 shadow-2xl  rounded-t-full relative z-0 hover:z-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
            <img className="rounded-full shadow-2xl max-h-32 max-w-32 mx-auto relative z-0 hover:z-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl" src={testimony.image} alt={testimony.name+" s'image"} />
            <h1 className="text-xl font-bold text-gray-600">{testimony.name}</h1>
            <p className="text-gray-600 mb-2">{testimony.testimonial}</p>
          </div>
          </div>
        </div>
      )
    })

    const fetchTestimonies = async()=>{
        let results = await fetch('/src/data/testimonies.json')
        let data = await results.json();
        setTestimonies(data)
    };
 
    useEffect(()=>{
      fetchTestimonies()
    })
//calculating the number of page in case testimonies number are not even
const pageCount = Math.ceil(testimonies.length/testimoniesPerPage)
//Clicking function to change page
const changePage = ({selected})=>{
  setPageNo(selected)
}


  return (
    <div className="bg-[url(/src/assets/testimonyBG.png)] bg-no-repeat py-8 mt-14">
      <h1 className="text-2xl font-bold text-center m-8 mb-10 text-white">What Our Community Say About Us</h1>
      <ReactPaginate
  previousLabel={"<"}
  nextLabel={">"}
  pageCount={pageCount}
  onPageChange={changePage}
  containerClassName="flex justify-center items-center relative my-6 space-x-2"
  pageClassName="w-3 h-3 bg-gray-400 rounded-full cursor-pointer"
  pageLinkClassName="hidden"
  activeClassName="bg-pink-500"
  previousClassName="absolute left-[35%] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200"
  nextClassName="absolute right-[35%] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer hover:bg-gray-200"
  disabledClassName="opacity-50 cursor-not-allowed"
/>

 
      <div className="flex w-[85%] mx-auto py-4">
      {liveTestimonies}
      </div>
    </div>
  )
}
