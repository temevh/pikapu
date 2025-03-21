const LastNameField = ({ lastNameUpdated }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Sukunimi"
        className={"custom-input-field"}
        onChange={(event) => lastNameUpdated(event.target.value)}
      />
    </div>
  );
};

export default LastNameField;
