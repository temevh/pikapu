const LogInButton = ({ logInPressed }) => {
  return (
    <div className="w-full shadow-xl">
      <button
        className="w-full custom-button py-2 rounded-lg hover:bg-black hover:cursor-pointer"
        onClick={logInPressed}
      >
        <p className="text-xl">Kirjaudu sisään</p>
      </button>
    </div>
  );
};

export default LogInButton;
