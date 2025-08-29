import React from 'react'

import { useEffect, useRef, useState } from "react";

const StatCounter = ({ target, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof target !== "number" || isNaN(target)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const counter = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);
  }, [target]);

  return (
    
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-5xl font-extrabold text-indigo-600">
        {isNaN(count) ? "0" : count}{suffix}
      </div>
      <p className="mt-2 text-lg text-gray-700">{label}</p>
      
    </div>
  );
};
export default StatCounter;