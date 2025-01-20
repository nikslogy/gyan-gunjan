"use client"

import { useState } from "react";

const Collaborators = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [newContributor, setNewContributor] = useState('');

  // Function to handle adding a new contributor
  const handleAddContributor = () => {
    if (newContributor.trim()) {
      setSubscribedUsers(prev => [...prev, newContributor.trim()]);
      setNewContributor('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Section 1: Display Submitted User Data */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black">Submitted User Data</h2>
        <div className="border rounded-lg p-4">
          {submittedData.length > 0 ? (
            submittedData.map((data, index) => (
              <div key={index} className="border-b py-2">
                <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Message:</strong> {data.message}</p>
              </div>
            ))
          ) : (
            <p>No submitted data available.</p>
          )}
        </div>
      </section>

      {/* Section 2: Display Newsletter Subscribed Users */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black">Newsletter Subscribed Users</h2>
        <div className="border rounded-lg p-4">
          {subscribedUsers.length > 0 ? (
            subscribedUsers.map((user, index) => (
              <div key={index} className="border-b py-2">
                <p>{user}</p>
              </div>
            ))
          ) : (
            <p>No subscribed users available.</p>
          )}
        </div>
      </section>

      {/* Section 3: Add New Contributor */}
      <section>
        <h2 className="text-2xl font-bold text-black">Add New Contributor</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newContributor}
            onChange={(e) => setNewContributor(e.target.value)}
            className="border rounded-lg text-black px-3 py-2"
            placeholder="Enter contributor name"
          />
          <button
            onClick={handleAddContributor}
            className="bg-[#F6B352] text-black py-2 px-4 rounded-lg hover:bg-[#E4A853] transition-colors"
          >
            Add Contributor
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collaborators;