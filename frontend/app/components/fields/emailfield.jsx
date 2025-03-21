const EmailField = ({ emailUpdated, emailValid }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Sähköposti"
        className={"custom-input-field"}
        onChange={(event) => emailUpdated(event.target.value)}
      />
    </div>
  );
};

export default EmailField;
