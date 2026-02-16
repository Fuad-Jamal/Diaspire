import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddJob({ onClose }) {
  const [form, setForm] = useState({
    jobTitle: '',
    companyName: '',
    jobType: '',
    jobLink: '',
    deadline: '',
    workMode: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobsCollection = collection(db, 'jobs');
    await addDoc(jobsCollection, form);
    alert('Job added!');
    setForm({
      jobTitle: '',
      companyName: '',
      jobType: '',
      jobLink: '',
      deadline: '',
      workMode: '',
    });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-center">Add New Job</h2>
      <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Job Title" className="border p-2 w-full" required />
      <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="border p-2 w-full" required />
      <input name="jobType" value={form.jobType} onChange={handleChange} placeholder="Job Type" className="border p-2 w-full" required />
      <input name="jobLink" value={form.jobLink} onChange={handleChange} placeholder="Job Link" className="border p-2 w-full" required />
      <input name="deadline" value={form.deadline} onChange={handleChange} placeholder="Deadline" className="border p-2 w-full" required />
      <input name="workMode" value={form.workMode} onChange={handleChange} placeholder="Work Mode" className="border p-2 w-full" required />
      <div className="flex justify-end space-x-2">
        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Job</button>
      </div>
    </form>
  );
}