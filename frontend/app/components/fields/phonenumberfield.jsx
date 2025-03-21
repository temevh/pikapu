import React from "react";

const PhoneNumberField = ({ phoneNumberUpdated }) => {
  return (
    <div className="w-full">
      <input
        type="tel"
        placeholder="Puhelinnumero"
        className="custom-input-field w-full text-center"
        onChange={(event) => phoneNumberUpdated(event.target.value)}
      />
    </div>
  );
};

export default PhoneNumberField;
