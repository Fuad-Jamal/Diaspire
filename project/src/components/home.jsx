import { useState } from 'react';



// const Home = ({onNavigate , currentPage}) => {
//     const [isHome, setHome] = useState (false)

//     const homePage = () => {
//         setHome(!isHome);
//     }

//     returnn(
//         <>
//             <div>
//                 <p>anifa</p>
//             </div>
        
//         </>
//     )
// }
const Home = ()=>{
    return(
        <>
        {/* first upper part */}
            <div className='bg-[url("./src/assets/home.png")] w-full'>
                <div className='lg:pt-24 lg:ml-[440px] pb-48 font-medium'>
                    <p className='lg:font-bold lg:text-3xl lg:w-[523px] lg:text-center '>Unlock Your Potential: Connect With Global Rwandan Expertise </p>
                    <p className=' lg:w-[503px] lg:pt-24 lg:text-[16px] lg:text-center'>Bridging Rwandan Youth with Diaspora Professionals for Mentorship, 
                            Skill Development and Career Success</p>
                    <div className='pt-24 pl-24'>
                        <button className='px-4 py-2 mr-12 rounded-lg bg-blue-500 text-white text-center font-bold'>Start My Jounery</button>
                        <button className='px-4 py-2 rounded-lg bg-blue-500 text-white text-center font-bold'>Be a Brige</button>
                    </div>
               </div>
            </div>

        {/* Who we are */}
            <div className='lg:flex gap-24 mt-24'>
                <div className='lg:w-[607px] ml-44'>
                    <p className='text-purple-700 text-3xl font-semibold mb-8'>Who We Are?</p>
                    <p className='pb-4 text-lg'>
                        Diaspire is a youth empowerment platform designed to connect ambitious African
                         youth with experienced diaspora professionals through meaningful mentorship,
                          career guidance, and global exposure. We believe that talent knows no borders 
                          and that the diaspora holds untapped potential to uplift the next generation 
                          through shared knowledge, networks, and lived experience.
                    </p>
                    <p className='pb-4 text-lg'>
                        Our mission is to build a sustainable, inclusive, and tech-enabled bridge between 
                        young people seeking direction and diaspora leaders eager to give back. Whether
                         you're a student looking for clarity, a graduate seeking opportunity, or a professional 
                         ready to mentor, Diaspire is where purpose meets possibility.
                    </p>
                    <p className='text-lg'>
                        Together, we’re not just building careers  we’re building futures.
                    </p>
                </div>
                <div>
                    <img className='pt-24 w-[345px] ml-[100px]' src="./src/assets/facetime.png" alt=""/>
                </div>
            </div>
        
        {/* Why choose Diaspire */}
            <div className='bg-gray-200 mt-24 pb-12'>
                <p className='text-center pt-8 pb-8 font-bold text-2xl text-purple-800'>Why Choose Diaspire?</p>
                <p className='text-center w-[678px] text-lg ml-[345px]   '>
                    Diaspire connects African youth with diaspora professionals through tech-driven
                     mentorship, career guidance, and global insight empowering the next generation of 
                     confident changemakers.
                </p>
                <p className='border-b-2 border-black pb-8 w-[352px] ml-[533px]'></p>
                
                {/* first three cards */}
                <div className='mt-24 flex gap-8'>
                    <div className='w-[323px] bg-white py-4 px-2 rounded-lg ml-[173px]'>
                        <img src="./src/assets/icon1.png" className='pb-4' alt="" />
                        <img src="./src/assets/lg1.png" className='-mt-24 -ml-4 p-8' alt="" />
                        <p className='pb-4 font-bold '>Flexible & Tech-enabled </p>
                        <p className='text-sm'>
                            Diaspire is designed to be easily accessible 
                            through a digital platform, ensuring that both 
                            mentors abroad and youth in Rwanda can 
                            connect anytime, anywhere.
                        </p>
                    </div>
                    <div className='w-[323px] bg-white py-4 px-2 rounded-lg '>
                        <img src="./src/assets/icon1.png" className='pb-4' alt="" />
                        <img src="./src/assets/lg2.png" className='-mt-24 -ml-2 p-8' alt="" />
                        <p className='pb-4 font-bold '>Real skills, real growth </p>
                        <p className='text-sm'> 

                            We go beyond advice. Diaspire connects you to
                            practical training, employability workshops,
                            and mentorship that build career-ready skills
                               aligned with global standards.
                            .
                        </p>
                    </div><div className='w-[323px] bg-white py-4 px-2 rounded-lg '>
                        <img src="./src/assets/icon1.png" className='pb-4' alt="" />
                        <img src="./src/assets/lg3.png" className='-mt-24 -ml-2 p-8' alt="" />
                        <p className='pb-4 font-bold '>A community that cares </p>
                        <p className='text-sm'>

                            When you join Diaspire, you become part of a 
                            supportive community of diaspora professionals,
                            youth, and change-makers all committed to Rwanda’s
                            growth and your personal success.

                            
                        </p>
                    </div>
                </div>

                {/* second three cards */}
                <div className='mt-12 flex gap-8'>
                    
                        <div className='w-[323px] bg-white py-4 px-2 rounded-lg ml-[173px] '>
                        <img src="./src/assets/icon1.png" className='pb-4' alt="" />
                        <img src="./src/assets/lg4.png" className='-mt-24 -ml-2 p-8' alt="" />
                        <p className='pb-4 font-bold '>Global insights, local impact </p>
                        <p className='text-sm'>

                            Diaspire harnesses the expertise of diaspora 
                            professionals to bring global knowledge home, 
                            while tailoring opportunities to Rwanda’s
                            unique job market and development goals.
                            
                        </p>
                    </div>
                    <div className='w-[323px] bg-white py-4 px-2 rounded-lg '>
                        <img src="./src/assets/icon1.png" className='pb-4' alt="" />
                        <img src="./src/assets/lg5.png" className='-mt-24 -ml-4 p-8' alt="" />
                        <p className='pb-4 font-bold '> Pathways to opportunity</p>
                        <p className='text-sm'>
                            Through networking, career readiness programs,
                            and exposure to new industries, Diaspire helps 
                            youth access internships, jobs, and entrepreneurial
                            ventures that create long-term impact.
                            
                        </p>
                    </div>
                    <div className='w-[323px] bg-white py-4 px-2 rounded-lg '>
                        <img src="./src/assets/icon1.png" className='pb-4' alt="" />
                        <img src="./src/assets/lg6.png" className='-mt-24 -ml-2 p-8' alt="" />
                        <p className='pb-4 font-bold '>Built on trust and purpose </p>
                        <p className='text-sm'> 

                            Diaspire is more than a platform — it is a 
                            movement dedicated to sustainable mentorship, 
                            accountability, and giving back, ensuring that 
                            every connection creates measurable change.
                           
                        </p>
                    </div>
                    
                </div>
            </div>
        
        {/* Who We Serve */}
        <div className='lg:ml-48 my-20'>
            <p className='font-bold text-2xl text-purple-800'>Who We Serve</p>
            <p className='border-b-8 border-blue-500 w-[34px] mt-4'></p>
            {/* contains four paragraphs and pic */}
            <div className='flex gap-20'>
                {/* contains four paragraphs */}
                <div>
                 
                    <div className='mt-12 flex gap-20'>
                        <div>
                            <img src="./src/assets/el1.png" alt="" />
                            <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
                            <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
                            <p className='mb-8 font-bold'>Youth & Mentees</p>
                            <p className='w-[213px] text-sm mb-12'>
                                Young Africans seeking
                                mentorship, career guidance, and
                                global exposure. They’re students, 
                                recent graduates, or early-career 
                                professionals looking to grow.</p>
                        </div>
                        <div>
                            <img src="./src/assets/el1.png" alt="" />
                            <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
                            <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
                            <p className='mb-8 font-bold'>Diaspora Mentors</p>
                            <p className='w-[213px] text-sm mb-12'>
                                Experienced professionals living
                                abroad who want to give back by
                                sharing knowledge, offering guidance, 
                                and supporting the next generation.
                            </p>
                        </div>
                    </div>

                    <div className='mt-12 flex gap-20'>
                        <div>
                            <img src="./src/assets/el1.png" alt="" />
                            <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
                            <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
                            <p className='mb-8 font-bold'>Partner Organizations</p>
                            <p className='w-[213px] text-sm mb-12'>
                                Nonprofits, universities, and 
                                companies that support youth 
                                development, talent pipelines, or 
                                diaspora engagement. They may 
                                sponsor programs or provide 
                                resources.
                            </p>
                        </div>
                        <div>
                            <img src="./src/assets/el1.png" alt="" />
                            <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
                            <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
                            <p className='mb-8 font-bold'>Platform Contributors</p>
                            <p className='w-[213px] text-sm mb-12'>
                                Designers, developers, educators, 
                                and volunteers who help build, 
                                improve, and scale Diaspire’s tech 
                                and content  the backbone of 
                                the ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
                <img src="./src/assets/business.png" className='w-[500px] h-[500px] ml-[50px]' alt="" />
            </div>

        </div>

       
        
        </>
    )
}
export default Home ;