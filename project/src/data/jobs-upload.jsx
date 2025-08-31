import React from 'react';
import jobs from '../data/jobs.json';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const uploadJobsToFirestore = async () => {
  const jobsCollection = collection(db, 'jobs');
  for (const job of jobs) {
    await addDoc(jobsCollection, job);
  }
  alert('Jobs uploaded!');
};

export default function UploadJobs() {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={uploadJobsToFirestore}
    >
      Upload All Jobs to Firestore
    </button>
  );
}