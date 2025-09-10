import React from 'react';

const HelpCardSection= () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mt-8">
      <h2 className="text-xl font-bold text-gray-900">Need More Help?</h2>
      <p className="mt-2 text-gray-600">
        If your mentorship requests aren't being accepted or you need general assistance, our support team is here for you.
      </p>
      <button className="mt-4 w-full bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full transition-colors duration-200 hover:bg-yellow-500">
        Request General Assistance
      </button>
    </div>
  );
};

export default HelpCardSection;