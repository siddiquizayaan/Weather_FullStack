/*import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) return alert("Please enter a location.");
    onSearch({ location, startDate, endDate });
    setLocation("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Enter location (city, landmark, zip...)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-2 rounded-lg border w-full md:w-1/3"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="px-4 py-2 rounded-lg border"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="px-4 py-2 rounded-lg border"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar; */

import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
      setLocation("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location (city, zip, etc.)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
