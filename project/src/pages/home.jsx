

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import ImpactSection from '../components/ImpactSection';
import Footer from '../components/footer';
import Testimonies from '../components/testimonies';

const Home = () => {
  const [inView, setInView] = useState({});
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView((prev) => ({ ...prev, [entry.target.id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const animationClass = (id) =>
    `transition-all duration-1000 ease-out transform ${
      inView[id] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`;

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.4}px)`,
  };

  return (
    <>
      <Navbar />
      {/* First upper part with parallax */}
      <div className='relative overflow-hidden w-full h-screen flex items-center justify-center text-center'>
        <div 
          className='absolute inset-0 bg-[url("./src/assets/home.png")] bg-cover bg-center transition-transform duration-500'
          style={parallaxStyle}
        ></div>
        <div className='relative z-10 p-4 lg:p-0'>
          <div className='max-w-xl mx-auto'>
            <p className='lg:font-bold lg:text-3xl font-bold text-2xl animate-pulse transition-all duration-1000 transform translate-y-0 opacity-100'>
              Unlock Your Potential: Connect With Global Rwandan Expertise
            </p>
            <p className='mt-6 lg:mt-24 lg:text-lg  transition-all duration-1000 delay-300 transform translate-y-0  text-black opacity-100'>
              Bridging Rwandan Youth with Diaspora Professionals for Mentorship, Skill Development and Career Success
            </p>
            <div className='mt-8 flex flex-col items-center lg:flex-row lg:justify-center lg:mt-24'>
              <button className='px-6 py-3 mb-4 lg:mb-0 lg:mr-8 rounded-lg bg-blue-500 text-white font-bold transition-all hover:scale-105 hover:bg-blue-600 duration-300 shadow-lg'>
                Start My Jounery
              </button>
              <button className='px-6 py-3 rounded-lg bg-blue-500 text-white font-bold transition-all hover:scale-105 hover:bg-blue-600 duration-300 shadow-lg'>
                Be a Bridge
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Who we are */}
      <div id="who-we-are" className={`lg:flex gap-24 mt-24 mx-8 lg:mx-0 lg:ml-44 animate-on-scroll ${animationClass('who-we-are')}`}>
        <div className='lg:w-[607px]'>
          <p className='text-purple-700 text-3xl font-bold mb-8 text-center lg:text-left'>Who We Are?</p>
          <p className='pb-4 text-lg'>
            Diaspire is a youth empowerment platform designed to connect ambitious African youth with experienced diaspora professionals through meaningful mentorship, career guidance, and global exposure. We believe that talent knows no borders and that the diaspora holds untapped potential to uplift the next generation through shared knowledge, networks, and lived experience.
          </p>
          <p className='pb-4 text-lg'>
            Our mission is to build a sustainable, inclusive, and tech-enabled bridge between young people seeking direction and diaspora leaders eager to give back. Whether you're a student looking for clarity, a graduate seeking opportunity, or a professional ready to mentor, Diaspire is where purpose meets possibility.
          </p>
          <p className='text-lg'>
            Together, we’re not just building careers — we’re building futures.
          </p>
        </div>
        <div className='flex justify-center lg:block'>
          <img className='pt-8 lg:pt-24 w-full h-auto max-w-xs lg:w-[345px] lg:ml-[100px]' src="./src/assets/facetime.png" alt="" />
        </div>
      </div>

      {/* Why choose Diaspire */}
      <div id="why-choose" className={`bg-gray-200 mt-24 pb-12 mx-auto animate-on-scroll ${animationClass('why-choose')}`}>
        <p className='text-center pt-8 pb-8 font-bold text-2xl text-purple-800'>Why Choose Diaspire?</p>
        <p className='text-center w-full lg:w-[678px] text-lg lg:ml-[345px] px-4'>
          Diaspire connects African youth with diaspora professionals through tech-driven mentorship, career guidance, and global insight empowering the next generation of confident changemakers.
        </p>
        <p className='border-b-2 border-black pb-8 w-[150px] mx-auto lg:w-[352px] lg:ml-[533px]'></p>

        {/* First three cards */}
        <div className='mt-12 lg:mt-24 flex flex-col items-center lg:flex-row lg:justify-center gap-8 px-4'>
          <div className='w-full lg:w-[323px] bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300'>
            <img src="./src/assets/icon1.png" className='pb-4' alt="" />
            <img src="./src/assets/lg1.png" className='-mt-24 -ml-4 p-8' alt="" />
            <p className='pb-4 font-bold'>Flexible & Tech-enabled </p>
            <p className='text-sm'>
              Diaspire is designed to be easily accessible through a digital platform, ensuring that both mentors abroad and youth in Rwanda can connect anytime, anywhere.
            </p>
          </div>
          <div className='w-full lg:w-[323px] bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300'>
            <img src="./src/assets/icon1.png" className='pb-4' alt="" />
            <img src="./src/assets/lg2.png" className='-mt-24 -ml-2 p-8' alt="" />
            <p className='pb-4 font-bold'>Real skills, real growth </p>
            <p className='text-sm'>
              We go beyond advice. Diaspire connects you to practical training, employability workshops, and mentorship that build career-ready skills aligned with global standards.
            </p>
          </div>
          <div className='w-full lg:w-[323px] bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300'>
            <img src="./src/assets/icon1.png" className='pb-4' alt="" />
            <img src="./src/assets/lg3.png" className='-mt-24 -ml-2 p-8' alt="" />
            <p className='pb-4 font-bold'>A community that cares </p>
            <p className='text-sm'>
              When you join Diaspire, you become part of a supportive community of diaspora professionals, youth, and change-makers all committed to Rwanda’s growth and your personal success.
            </p>
          </div>
        </div>

        {/* Second three cards */}
        <div className='mt-8 lg:mt-12 flex flex-col items-center lg:flex-row lg:justify-center gap-8 px-4'>
          <div className='w-full lg:w-[323px] bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300'>
            <img src="./src/assets/icon1.png" className='pb-4' alt="" />
            <img src="./src/assets/lg4.png" className='-mt-24 -ml-2 p-8' alt="" />
            <p className='pb-4 font-bold'>Global insights, local impact </p>
            <p className='text-sm'>
              Diaspire harnesses the expertise of diaspora professionals to bring global knowledge home, while tailoring opportunities to Rwanda’s unique job market and development goals.
            </p>
          </div>
          <div className='w-full lg:w-[323px] bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300'>
            <img src="./src/assets/icon1.png" className='pb-4' alt="" />
            <img src="./src/assets/lg5.png" className='-mt-24 -ml-4 p-8' alt="" />
            <p className='pb-4 font-bold'>Pathways to opportunity</p>
            <p className='text-sm'>
              Through networking, career readiness programs, and exposure to new industries, Diaspire helps youth access internships, jobs, and entrepreneurial ventures that create long-term impact.
            </p>
          </div>
          <div className='w-full lg:w-[323px] bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300'>
            <img src="./src/assets/icon1.png" className='pb-4' alt="" />
            <img src="./src/assets/lg6.png" className='-mt-24 -ml-2 p-8' alt="" />
            <p className='pb-4 font-bold'>Built on trust and purpose </p>
            <p className='text-sm'>
              Diaspire is more than a platform — it is a movement dedicated to sustainable mentorship, accountability, and giving back, ensuring that every connection creates measurable change.
            </p>
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div id="who-we-serve" className={`lg:ml-48 my-12 lg:my-20 mx-8 lg:mx-0 animate-on-scroll ${animationClass('who-we-serve')}`}>
        <p className='font-bold text-2xl text-purple-800 text-center lg:text-left'>Who We Serve</p>
        <p className='border-b-8 border-blue-500 w-[34px] mt-4 mx-auto lg:mx-0'></p>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-20 mt-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20'>
            <div className='flex flex-col items-center lg:items-start p-4 rounded-lg transition-transform hover:scale-105 duration-300'>
              <img src="./src/assets/el1.png" alt="" />
              <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
              <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
              <p className='mb-4 font-bold text-center lg:text-left'>Youth & Mentees</p>
              <p className='w-full lg:w-[213px] text-sm text-center lg:text-left'>
                Young Africans seeking mentorship, career guidance, and global exposure. They’re students, recent graduates, or early-career professionals looking to grow.
              </p>
            </div>
            <div className='flex flex-col items-center lg:items-start p-4 rounded-lg transition-transform hover:scale-105 duration-300'>
              <img src="./src/assets/el1.png" alt="" />
              <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
              <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
              <p className='mb-4 font-bold text-center lg:text-left'>Diaspora Mentors</p>
              <p className='w-full lg:w-[213px] text-sm text-center lg:text-left'>
                Experienced professionals living abroad who want to give back by sharing knowledge, offering guidance, and supporting the next generation.
              </p>
            </div>
            <div className='flex flex-col items-center lg:items-start p-4 rounded-lg transition-transform hover:scale-105 duration-300'>
              <img src="./src/assets/el1.png" alt="" />
              <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
              <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
              <p className='mb-4 font-bold text-center lg:text-left'>Partner Organizations</p>
              <p className='w-full lg:w-[213px] text-sm text-center lg:text-left'>
                Nonprofits, universities, and companies that support youth development, talent pipelines, or diaspora engagement. They may sponsor programs or provide resources.
              </p>
            </div>
            <div className='flex flex-col items-center lg:items-start p-4 rounded-lg transition-transform hover:scale-105 duration-300'>
              <img src="./src/assets/el1.png" alt="" />
              <img src="./src/assets/el2.png" className='-mt-16 ml-2 pb-2 pt-1' alt="" />
              <img src="./src/assets/el3.png" className='-mt-12 ml-6 mb-12' alt="" />
              <p className='mb-4 font-bold text-center lg:text-left'>Platform Contributors</p>
              <p className='w-full lg:w-[213px] text-sm text-center lg:text-left'>
                Designers, developers, educators, and volunteers who help build, improve, and scale Diaspire’s tech and content — the backbone of the ecosystem.
              </p>
            </div>
          </div>
          <img src="./src/assets/business.png" className='w-full h-auto lg:w-[500px] lg:h-[500px] mt-8 lg:mt-0 lg:ml-[50px] mx-auto' alt="" />
        </div>
      </div>
      <ImpactSection />
      <Testimonies />
      <Footer />
    </>
  );
};
export default Home;