import React from "react";

const SchoolCodeField = ({ schoolCodeUpdated }) => {
  return (
    <div className="w-full">
      <input
        type="number"
        placeholder="Koulun koodi"
        className="custom-input-field w-full text-center"
        onChange={(event) => schoolCodeUpdated(event.target.value)}
      />
    </div>
  );
};

export default SchoolCodeField;
