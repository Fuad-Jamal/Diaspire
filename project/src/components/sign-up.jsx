import React from "react";

function SignUpPopup({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up to Diaspire</h2>

        <p className="mb-6 text-center text-gray-600">
          Choose how you’d like to join the platform
        </p>

        {/* Youth Option */}
        <button
          onClick={() => onSelect("youth")}
          className="w-full bg-blue-500 text-white py-2 rounded font-bold mb-4"
        >
          Join as Youth
        </button>

        {/* Professional Option */}
        <button
          onClick={() => onSelect("professional")}
          className="w-full bg-purple-600 text-white py-2 rounded font-bold mb-4"
        >
          Join as Professional
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full bg-gray-300 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SignUpPopup;
