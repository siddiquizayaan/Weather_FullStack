/*import { useState } from "react";

const LocationButton = ({ onLocationSearch }) => {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSearch({ lat: latitude, lon: longitude });
        setLoading(false);
      },
      (error) => {
        alert("Failed to get location: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <button
      onClick={getCurrentLocation}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
    >
      {loading ? "Locating..." : "Use Current Location"}
    </button>
  );
};

export default LocationButton;
*/

import React from "react";

const LocationButton = ({ onDetect }) => {
  const handleDetect = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onDetect(coords.latitude, coords.longitude);
      },
      () => alert("Unable to detect location")
    );
  };

  return <button onClick={handleDetect}>Use My Location</button>;
};

export default LocationButton;