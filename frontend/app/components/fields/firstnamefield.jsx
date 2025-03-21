const FirstNameField = ({ firstNameUpdated }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Etunimi"
        className={"custom-input-field"}
        onChange={(event) => firstNameUpdated(event.target.value)}
      />
    </div>
  );
};

export default FirstNameField;
