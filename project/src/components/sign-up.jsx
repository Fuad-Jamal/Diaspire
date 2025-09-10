import React from "react";

function SignUpPopup({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#002F6C]">
          Sign Up to Diaspire
        </h2>

        <p className="mb-6 text-center text-gray-600">
          Choose how you’d like to join the platform
        </p>

        {/* Youth Option */}
        <button
          onClick={() => onSelect("youth")}
          className="w-full bg-[#FDCB58] text-[#002F6C] py-2 rounded-full font-bold mb-4 hover:scale-105 transition-transform"
        >
          Join as Youth
        </button>

        {/* Professional Option */}
        <button
          onClick={() => onSelect("professional")}
          className="w-full bg-[#002F6C] text-white py-2 rounded-full font-semibold hover:bg-[#001a3d] transition mb-4"
        >
          Join as Professional
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-full hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SignUpPopup;
