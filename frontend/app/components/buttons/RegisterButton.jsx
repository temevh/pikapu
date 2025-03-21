import React from "react";

const RegisterButton = ({ registerPressed }) => {
  return (
    <button
      onClick={registerPressed}
      className="w-full custom-button py-2 rounded-lg hover:bg-black hover:cursor-pointer"
    >
      Rekisteröidy
    </button>
  );
};

export default RegisterButton;
