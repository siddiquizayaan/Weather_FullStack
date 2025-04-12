/*import React from "react";

const HistoryList = ({ historyData }) => {
  return (
    <div>
      <h3 className="text-xl font-bold">Search History</h3>
      <ul>
        {historyData.map((item) => (
          <li key={item._id} className="border-b py-2">
            <div>{item.location}</div>
            <div>{new Date(item.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
*/

import React from "react";

const HistoryList = ({ history, onDelete }) => (
  <div>
    <h3>Search History</h3>
    {history.map((item) => (
      <div key={item._id} className="card">
        <p><strong>{item.location}</strong></p>
        <p>{new Date(item.createdAt).toLocaleString()}</p>
        <button onClick={() => onDelete(item._id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default HistoryList;