import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Search, Linkedin, Github, Instagram, Twitter } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const mentors = [
  { id: 1, name: "Joyelene Rivera", title: "Web Developer", category: "Tech", bio: "Data analyst with 4+ yrs in machine learning & analytics.", img: "https://i.pravatar.cc/150?img=1", socials: { linkedin: "#", github: "#", twitter: "#", instagram: "#" } },
  { id: 2, name: "Marcus Lee", title: "UX Designer", category: "Tech", bio: "UX/UI designer helping students break into product design.", img: "https://i.pravatar.cc/150?img=2", socials: { linkedin: "#", github: "#", twitter: "#", instagram: "#" } },
  { id: 3, name: "Aisha Kamau", title: "Data Scientist", category: "Finance", bio: "Helping mentees transition into data careers.", img: "https://i.pravatar.cc/150?img=3", socials: { linkedin: "#", github: "#", twitter: "#", instagram: "#" } },
  { id: 4, name: "Daniel Kim", title: "Mobile Developer", category: "Tech", bio: "Loves mentoring juniors in Flutter & React Native.", img: "https://i.pravatar.cc/150?img=4", socials: { linkedin: "#", github: "#", twitter: "#", instagram: "#" } },
  { id: 5, name: "Sara Lopez", title: "AI Engineer", category: "Finance", bio: "Helping Gen-Z embrace AI and ML careers.", img: "https://i.pravatar.cc/150?img=5", socials: { linkedin: "#", github: "#", twitter: "#", instagram: "#" } },
  { id: 6, name: "Omar Hassan", title: "Cloud Engineer", category: "Tech", bio: "Focused on cloud-native career paths.", img: "https://i.pravatar.cc/150?img=6", socials: { linkedin: "#", github: "#", twitter: "#", instagram: "#" } },
];

function FindMentor() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(0);

  const mentorsPerPage = 3;

  const filtered = mentors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
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

  const categories = ["All", "Tech", "Finance"];

  return (
    <div>
      <Navbar />
      <div
        {...handlers}
        className="min-h-screen bg-gradient-to-br from-[#FDCB58] via-[#4032bb] to-[#FDCB58] p-8 flex flex-col"
      >
        {/* Intro Banner */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🔗 Plug into Purpose</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Connect with Rwandan diasporas who vibe with your goals, guide your grind, and open global doors.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-xl mx-auto mb-8 flex items-center space-x-2">
          <div className="flex items-center bg-white/90 rounded-full shadow-lg px-4 py-2 flex-1">
            <Search className="text-[#6BB7C9]" />
            <input
              type="text"
              placeholder="Who's your next plug? 🔍"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="ml-3 flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(0); }}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  category === cat
                    ? "bg-[#D17C5C] text-white"
                    : "bg-white/80 text-gray-700 hover:bg-[#F4A261]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 flex-1">
          {paginated.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#002F6C] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              style={{
                backgroundImage: "url('C:\Users\hp\Diaspire\project\src\assets\imigongo.svg')",
                backgroundRepeat: "repeat",
                backgroundSize: "80px",
                opacity: 0.95,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#F4A261]"
                />
                <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
                <p className="text-[#6BB7C9] font-medium">{mentor.title}</p>
                <p className="text-gray-400 mt-3 text-sm">{mentor.bio}</p>
              </div>

              <div className="flex justify-center gap-4 mt-5 text-gray-500">
                <a href={mentor.socials.twitter} className="hover:text-blue-400">
                  <Twitter size={20} />
                </a>
                <a href={mentor.socials.instagram} className="hover:text-pink-500">
                  <Instagram size={20} />
                </a>
                <a href={mentor.socials.linkedin} className="hover:text-blue-600">
                  <Linkedin size={20} />
                </a>
                <a href={mentor.socials.github} className="hover:text-gray-800">
                  <Github size={20} />
                </a>
              </div>

              <button className="mt-6 w-full bg-gradient-to-r from-[#6BB7C9] via-[#F4A261] to-[#A3C586] hover:from-[#4B4B4B] hover:via-[#D17C5C] hover:to-[#A3C586] text-white py-2 rounded-xl font-medium transition">
                Connect with your plug 🚀
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === page
                  ? "bg-gradient-to-r from-[#6BB7C9] via-[#F4A261] to-[#A3C586] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default FindMentor;
