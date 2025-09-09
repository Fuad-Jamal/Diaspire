import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import ImpactSection from '../components/ImpactSection';
import Footer from '../components/footer';
import Testimonies from '../components/testimonies';
import GoogleSignIn from '../utilities/auth';


const Home = () => {
  const [inView, setInView] = useState({});
const [selectedRole, setSelectedRole] = useState(null);

  const [scrollY, setScrollY] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const [showAuthPopup, setShowAuthPopup] = useState(false);
const [showSignUpPopup, setShowSignUpPopup] = useState(false);
const [authMode, setAuthMode] = useState("signup"); // force signup
const [showRolePopup, setShowRolePopup] = useState(false);

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

    const handleScroll = () => setScrollY(window.scrollY);
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

 const handleSignIn = (user) => {
  console.log("User signed in:", user);
  setShowAuth(false);

  if (selectedRole === 'youth') {
    navigate('/mprofile'); // go to mentee profile
  } else if (selectedRole === 'professional') {
    navigate('/profile'); // go to mentor profile
  }
};


  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />

      {/* Auth popup */}
      {showAuth && (
        <GoogleSignIn
          onClose={() => setShowAuth(false)}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />
      )}

      {/* Hero Section with Parallax */}
     <section
  className="relative w-full h-[90vh] overflow-hidden bg-gradient-to-r from-[#002F6C] to-[#FDCB58] flex items-center justify-between px-6 lg:px-24"
>
  {/* Text Content */}
  <div className="relative z-20 max-w-xl text-white mx-auto ml-20 lg:text-left">
    <h1 className="text-sm uppercase tracking-wide font-semibold mb-2">Unlock Your Potential</h1>
    <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-4">
      Connect With Global Rwandan Expertise
    </h2>
    <p className="text-lg font-inter mb-6 max-w-md mx-auto lg:mx-0 text-white/90">
      Bridging Rwandan Youth with Diaspora Professionals for Mentorship, Skill Development and Career Success
    </p>

    <div className="mt-8 flex flex-col lg:flex-row lg:justify-start gap-4 max-w-md mx-auto lg:mx-0">
      <button
        className="px-6 py-3 rounded-lg bg-[#FDCB58] text-[#002F6C] font-bold hover:brightness-110 transition-transform duration-300"
        onClick={() => {
          setSelectedRole("youth");
          setShowAuth(true);
        }}
      >
        Join As Youth
      </button>

      <button
        className="px-6 py-3 rounded-lg bg-[#FDCB58] text-[#002F6C] font-bold hover:brightness-110 transition-transform duration-300"
        onClick={() => {
          setSelectedRole("professional");
          setShowAuth(true);
        }}
      >
        Join As Professional
      </button>
    </div>
  </div>

  {/* Background Image - no black overlay, use blend mode to show gradient behind */}
  <div className="absolute bottom-0 right-0 w-full lg:w-1/2 h-full z-10 overflow-hidden">
    <img
      src="./src/assets/background2.jpg"
      alt="Diaspire Hero"
      className="object-cover w-full h-full opacity-70 mix-blend-screen relative z-10"
      style={{ willChange: "transform" }}
    />
  </div>

  {/* Popups (unchanged) */}
  {showRolePopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-xl font-bold text-center mb-4 text-[#002F6C]">Select Your Role</h2>
        <div className="flex flex-col gap-4">
          <button
            className="px-4 py-2 bg-[#FDCB58] text-[#002F6C] rounded-full font-bold hover:scale-105 transition-transform"
            onClick={() => {
              setSelectedRole("youth");
              setAuthMode("signup");
              setShowRolePopup(false);
              setShowAuthPopup(true);
            }}
          >
            Join as Youth
          </button>
          <button
            className="px-4 py-2 bg-[#002F6C] text-white rounded-full font-semibold hover:bg-[#001a3d] transition"
            onClick={() => {
              setSelectedRole("professional");
              setAuthMode("signup");
              setShowRolePopup(false);
              setShowAuthPopup(true);
            }}
          >
            Join as Professional
          </button>
        </div>
        <button
          className="mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
          onClick={() => setShowRolePopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )}

  {showSignUpPopup && (
    <SignUpPopup
      onClose={() => setShowSignUpPopup(false)}
      onSelect={(role) => {
        setSelectedRole(role);
        setShowSignUpPopup(false);
        setShowAuthPopup(true);
      }}
    />
  )}

  {showAuthPopup && (
    <GoogleAuthPopup
      mode={authMode}
      onClose={() => setShowAuthPopup(false)}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
    />
  )}

  {/* Custom Animation */}
  <style jsx>{`
    @keyframes riseFade {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-riseFade {
      animation: riseFade 1.2s ease-out forwards;
    }
  `}</style>
</section>


      {/* Who We Are */}
      <div
        id="who-we-are"
        className={`lg:flex gap-24 mt-24 mx-8 lg:mx-0 lg:ml-44 animate-on-scroll ${animationClass(
          'who-we-are'
        )}`}
      >
        <div className="lg:w-[607px]">
          <p className="text-purple-700 text-3xl font-bold mb-8 text-center lg:text-left">
            Who We Are?
          </p>
          <p className="pb-4 text-lg">
            Diaspire is a youth empowerment platform designed to connect ambitious African youth with experienced diaspora professionals through meaningful mentorship, career guidance, and global exposure.
          </p>
          <p className="pb-4 text-lg">
            Our mission is to build a sustainable, inclusive, and tech-enabled bridge between young people seeking direction and diaspora leaders eager to give back.
          </p>
          <p className="text-lg">Together, we’re not just building careers — we’re building futures.</p>
        </div>
        <div className="flex justify-center lg:block">
          <img
            className="pt-8 lg:pt-24 w-full h-auto max-w-xs lg:w-[345px] lg:ml-[100px]"
            src="./src/assets/facetime.png"
            alt=""
          />
        </div>
      </div>

      {/* Why Choose Diaspire */}
      <div id="why-choose" className={`bg-gray-200 mt-24 pb-12 animate-on-scroll ${animationClass('why-choose')}`}>
        <p className="text-center pt-8 pb-8 font-bold text-2xl text-purple-800">Why Choose Diaspire?</p>
        <p className="text-center w-full lg:w-[678px] text-lg mx-auto px-4">
          Diaspire connects African youth with diaspora professionals through tech-driven mentorship, career guidance, and global insight empowering the next generation of confident changemakers.
        </p>
        <p className="border-b-2 border-black pb-8 w-[150px] mx-auto lg:w-[352px]"></p>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-24">
          {[
            {
              img: 'lg1.png',
              title: 'Flexible & Tech-enabled',
              text: 'Diaspire is designed to be easily accessible through a digital platform, ensuring that both mentors abroad and youth in Rwanda can connect anytime, anywhere.',
            },
            {
              img: 'lg2.png',
              title: 'Real skills, real growth',
              text: 'We go beyond advice. Diaspire connects you to practical training, employability workshops, and mentorship that build career-ready skills aligned with global standards.',
            },
            {
              img: 'lg3.png',
              title: 'A community that cares',
              text: 'When you join Diaspire, you become part of a supportive community of diaspora professionals, youth, and change-makers all committed to Rwanda’s growth and your personal success.',
            },
            {
              img: 'lg4.png',
              title: 'Global insights, local impact',
              text: 'Diaspire harnesses the expertise of diaspora professionals to bring global knowledge home, while tailoring opportunities to Rwanda’s unique job market and development goals.',
            },
            {
              img: 'lg5.png',
              title: 'Pathways to opportunity',
              text: 'Through networking, career readiness programs, and exposure to new industries, Diaspire helps youth access internships, jobs, and entrepreneurial ventures that create long-term impact.',
            },
            {
              img: 'lg6.png',
              title: 'Built on trust and purpose',
              text: 'Diaspire is more than a platform — it is a movement dedicated to sustainable mentorship, accountability, and giving back, ensuring that every connection creates measurable change.',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white py-4 px-2 rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
            >
              <img src="./src/assets/icon1.png" className="pb-4" alt="" />
              <img src={`./src/assets/${card.img}`} className="-mt-24 -ml-2 p-8" alt={card.title} />
              <p className="pb-4 font-bold">{card.title}</p>
              <p className="text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Serve */}
      <div
        id="who-we-serve"
        className={`lg:ml-48 my-12 lg:my-20 mx-8 lg:mx-0 animate-on-scroll ${animationClass('who-we-serve')}`}
      >
        <p className="font-bold text-2xl text-purple-800 text-center lg:text-left">Who We Serve</p>
        <p className="border-b-8 border-blue-500 w-[34px] mt-4 mx-auto lg:mx-0"></p>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
            {[
              {
                title: 'Youth & Mentees',
                text: 'Young Africans seeking mentorship, career guidance, and global exposure.',
              },
              {
                title: 'Diaspora Mentors',
                text: 'Experienced professionals living abroad who want to give back by sharing knowledge and supporting the next generation.',
              },
              {
                title: 'Partner Organizations',
                text: 'Nonprofits, universities, and companies that support youth development and diaspora engagement.',
              },
              {
                title: 'Platform Contributors',
                text: 'Designers, developers, educators, and volunteers who help build and scale Diaspire’s tech and content.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center lg:items-start p-4 rounded-lg transition-transform hover:scale-105 duration-300"
              >
                <img src="./src/assets/el1.png" alt="" />
                <img src="./src/assets/el2.png" className="-mt-16 ml-2 pb-2 pt-1" alt="" />
                <img src="./src/assets/el3.png" className="-mt-12 ml-6 mb-12" alt="" />
                <p className="mb-4 font-bold">{item.title}</p>
                <p className="w-full lg:w-[213px] text-sm text-center lg:text-left">{item.text}</p>
              </div>
            ))}
          </div>
          <img
            src="./src/assets/business.png"
            className="w-full h-auto lg:w-[500px] lg:h-[500px] mt-8 lg:mt-0 lg:ml-[50px] mx-auto"
            alt=""
          />
        </div>
      </div>

      <ImpactSection />
      <Testimonies />
      <Footer />
    </>
  );
};

export default Home;