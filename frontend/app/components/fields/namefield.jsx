import React from "react";

const NameField = ({ firstNameUpdated, lastNameUpdated }) => {
  return (
    <div className="w-full flex flex-row gap-4">
      <input
        type="text"
        placeholder="Etunimi"
        className="custom-input-field w-full text-center"
        onChange={(event) => firstNameUpdated(event.target.value)}
      />
      <input
        type="text"
        placeholder="Sukunimi"
        className="custom-input-field w-full text-center"
        onChange={(event) => lastNameUpdated(event.target.value)}
      />
    </div>
  );
};

export default NameField;
