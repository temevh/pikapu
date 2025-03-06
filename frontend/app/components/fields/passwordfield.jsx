import React from "react";

const PasswordField = ({ passwordUpdated }) => {
  return (
    <div>
      <input
        type="password"
        placeholder="Password"
        className="custom-input-field"
        onChange={(event) => passwordUpdated(event.target.value)}
      />
    </div>
  );
};

export default PasswordField;
