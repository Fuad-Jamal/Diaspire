import React from 'react';

const ImpactChart = () => {
  const data = [
    { label: 'Mentees', value: 3, color: 'bg-blue-500' },
    { label: 'Hours', value: 12, color: 'bg-green-500' },
    { label: 'Resources', value: 5, color: 'bg-yellow-500' }
  ];

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white rounded-lg shadow-lg p-10 w-[80%] mx-auto mt-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">My Impact</h2>
        <p className="text-sm text-gray-600">
          Visualizing your contribution to empowering the next generation of Rwandan leaders.
        </p>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500 -ml-6">
          <span>12</span>
          <span>10</span>
          <span>8</span>
          <span>6</span>
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 ml-4">
          {[0, 1, 2, 3, 4, 5, 6].map((line) => (
            <div
              key={line}
              className="absolute w-full border-t border-gray-200"
              style={{
                top: `${(line / 6) * 100}%`
              }}
            />
          ))}
        </div>

        {/* Chart bars */}
        <div className="flex items-end justify-center space-x-8 h-64 ml-4 relative z-10">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Bar */}
              <div
                className={`${item.color} w-12 rounded-t-sm transition-all duration-500 ease-out`}
                style={{
                  height: `${(item.value / maxValue) * 200}px`
                }}
              />
              {/* Label */}
              <span className="text-xs text-gray-600 mt-2 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactChart;