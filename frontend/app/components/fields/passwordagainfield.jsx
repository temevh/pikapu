import React from "react";

const PasswordAgainField = ({ passwordAgainUpdated }) => {
  return (
    <div>
      <input
        type="password"
        placeholder="Retype password"
        className="custom-input-field"
        onChange={(event) => passwordAgainUpdated(event.target.value)}
      />
    </div>
  );
};

export default PasswordAgainField;
