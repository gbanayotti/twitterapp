import React from 'react';

const Dropdown = ({ colorBy, setColorBy }) => {
  return (
    <div>
      <span style={{ fontWeight: "bold" }}>Color By: </span>
      <select
        id="colorBy"
        value={colorBy}
        onChange={(e) => setColorBy(e.target.value)}
      >
        <option value="Sentiment">Sentiment</option>
        <option value="Subjectivity">Subjectivity</option>
      </select>
    </div>
  );
};

export default Dropdown;
