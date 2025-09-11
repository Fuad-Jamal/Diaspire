import { useState } from "react";
import DashboardHumburger from "/public/assets/DashboardToggleHumburger.png"

function DashboardToggle({prop}) {
  // state: true = visible, false = hidden
  const [isOpen, setIsOpen] = useState(false);

  // toggle function
  const toggleDashboard = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className=" pl-2 overflow-visible lg:-mt-20 ">
      {/* clickable image */}
      <img
        src={DashboardHumburger } // replace with your image
        alt="Toggle dashboard"
        onClick={toggleDashboard}
        className="cursor-pointer w-12 h-12 hover:opacity-80"
      />

      {/* conditional rendering of the dashboard */}
      {isOpen && (
        <div className="mt-12 bg-white z-50 border rounded-lg shadow-lg lg:w-80">
          {prop}
        </div>
      )}
    </div>
  );
}

export default DashboardToggle;
