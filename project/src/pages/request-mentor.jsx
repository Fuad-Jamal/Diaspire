import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function RequestMentorship() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
    goals: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "mentorshipRequests"), formData);
      alert("✅ Your mentorship request has been submitted!");
      setFormData({ name: "", email: "", interests: "", goals: "" });
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("❌ Failed to submit. Try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
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
              placeholder="What expectations do you hope to gain from the mentorship?"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A3C586]"
              required
            />

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#6BB7C9] via-[#F4A261] to-[#A3C586] 
                           text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Submit Request 🚀
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RequestMentorship;
