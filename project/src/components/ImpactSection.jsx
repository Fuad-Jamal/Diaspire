
import React from 'react';
import StatCounter from '../StatCounter';

export default function ImpactSection() {
  return (
    <div>
      <section className="relative grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-4 md:px-8 bg-blue-300 h-auto text-center">
        <h1 className="absolute text-gray-900 top-4 left-1/2 transform -translate-x-1/2 text-center text-2xl font-bold z-10">
          Our Impact
        </h1>
        <StatCounter target={320} label="Jobs Secured" />
        <StatCounter target={250} label="Mentors Engaged" />
        <StatCounter target={18} label="Countries Represented" />
      </section>
    </div>
  );
}

