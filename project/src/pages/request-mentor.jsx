import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function RequestMentorship() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
    goals: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mentorship request submitted:", formData);

    // TODO: send to Firestore or backend
    alert("Your mentorship request has been submitted!");
    setFormData({ name: "", email: "", interests: "", goals: "" });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Request Mentorship ✨
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6BB7C9]"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6BB7C9]"
              required
            />
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="What topics or skills are you interested in?"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4A261]"
              required
            />
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="What do you hope to achieve with mentorship?"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A3C586]"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6BB7C9] via-[#F4A261] to-[#A3C586] 
                         text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Submit Request 🚀
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RequestMentorship;
