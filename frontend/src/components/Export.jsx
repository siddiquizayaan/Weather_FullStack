/*import React from "react";

const ExportButtons = () => {
  const handleExport = (format) => {
    const url = `http://localhost:5000/api/weather/export?format=${format}`;
    window.open(url, "_blank");
  };

  return (
    <div className="text-center space-x-4">
      <button
        onClick={() => handleExport("json")}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Export JSON
      </button>
      <button
        onClick={() => handleExport("csv")}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Export CSV
      </button>
      <button
        onClick={() => handleExport("xml")}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Export XML
      </button>
      <button
        onClick={() => handleExport("pdf")}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
*/

import React from "react";

const ExportButtons = ({ onExport }) => (
  <div>
    <button onClick={() => onExport("json")}>Export JSON</button>
    <button onClick={() => onExport("csv")}>Export CSV</button>
    <button onClick={() => onExport("xml")}>Export XML</button>
    <button onClick={() => onExport("pdf")}>Export PDF</button>
  </div>
);

export default ExportButtons;