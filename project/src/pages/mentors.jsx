import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Search, Linkedin, Github, Instagram, Twitter } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import airplaneImage from "../assets/air.jpeg";

function FindMentor() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const mentorsPerPage = 9;

  const filtered = mentors.filter((m) => {
    const matchesSearch = m.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || m.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / mentorsPerPage);
  const start = page * mentorsPerPage;
  const paginated = filtered.slice(start, start + mentorsPerPage);

  const handlers = useSwipeable({
    onSwipedLeft: () => setPage((p) => Math.min(p + 1, totalPages - 1)),
    onSwipedRight: () => setPage((p) => Math.max(p - 1, 0)),
    trackMouse: true,
  });

  useEffect(() => {
    const fetchMentorsFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mentors"));
        const mentorsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMentors(mentorsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setLoading(false);
      }
    };
    fetchMentorsFromFirestore();
  }, []);

  const categories = ["All", "Tech", "Finance"];

  const handleSendRequest = async (mentorId) => {
    const menteeId = localStorage.getItem("menteeId");
    if (!menteeId || !mentorId) {
      alert("Missing mentee or mentor ID.");
      return;
    }

    try {
      await addDoc(collection(db, "requests"), {
        menteeId,
        mentorId,
        requestedAt: Timestamp.now(),
        status: "pending"
      });
      alert("Mentorship request sent!");
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen text-white"
        style={{
          background: "linear-gradient(to right, #002F6C, #FDCB58)",
        }}
      >
        <div {...handlers} className="px-6 py-10 flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold drop-shadow">🔗 Plug into Purpose</h2>
            <p className="text-white/80 mt-2 text-sm max-w-2xl mx-auto">
              Connect with Rwandan diasporas who vibe with your goals, guide your grind, and open global doors.
            </p>
          </div>

          {/* Request Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/request-mentor")}
              className="px-5 py-2 bg-[#FDCB58] text-[#002F6C] font-bold rounded-full shadow-md hover:brightness-110 transition duration-300"
            >
              Request Mentorship 🚀
            </button>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-white/20 text-white rounded-full px-4 py-2 flex-1 border border-white/30 backdrop-blur-sm">
              <Search className="text-white" />
              <input
                type="text"
                placeholder="Who's your next plug? 🔍"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="ml-3 flex-1 outline-none bg-transparent text-white placeholder-white/70"
              />
            </div>

            <div className="flex space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setPage(0);
                  }}
                  className={`px-4 py-1.5 text-sm rounded-full font-semibold transition ${
                    category === cat
                      ? "bg-[#FDCB58] text-[#002F6C]"
                      : "bg-white/20 text-white hover:bg-[#FDCB58] hover:text-[#002F6C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mentor Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((mentor) => (
              <div
                key={mentor.id}
                className="relative group p-6 rounded-2xl overflow-hidden bg-[#1A3E6C] hover:text-white text-white transition-all duration-500 shadow-md"
              >
                <div
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${airplaneImage})` }}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <img
                    src={mentor.img}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#FDCB58]"
                  />
                  <h3 className="text-lg font-semibold opacity-90 group-hover:opacity-100 transition">
                    {mentor.name}
                  </h3>
                  <p className="text-yellow-300 font-medium opacity-80 group-hover:opacity-100 transition">
                    {mentor.title}
                  </p>
                  <p className="text-sm mt-3 opacity-70 group-hover:opacity-90 transition">{mentor.bio}</p>
                </div>

                <div className="relative z-10 flex justify-center gap-4 mt-5 text-white">
                  {mentor.socials?.twitter && <a href={mentor.socials.twitter}><Twitter size={20} /></a>}
                  {mentor.socials?.instagram && <a href={mentor.socials.instagram}><Instagram size={20} /></a>}
                  {mentor.socials?.linkedin && <a href={mentor.socials.linkedin}><Linkedin size={20} /></a>}
                  {mentor.socials?.github && <a href={mentor.socials.github}><Github size={20} /></a>}
                </div>

                <button
                  onClick={() => handleSendRequest(mentor.id)}
                  className="relative z-10 mt-6 w-full py-2 rounded-xl font-semibold bg-[#FDCB58] text-[#002F6C] hover:brightness-110"
                >
                  Connect with your plug
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === page ? "bg-white scale-125" : "bg-white/40 hover:bg-white"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default FindMentor;
