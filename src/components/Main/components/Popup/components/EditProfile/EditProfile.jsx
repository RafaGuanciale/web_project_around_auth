import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nome"
        type="text"
        required
        minLength="2"
        maxLength="40"
        id="name"
        value={name}
        onChange={handleChangeName}
      />
      <span className="name-input-error form__input-error"></span>
      <input
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Sobre mim"
        type="text"
        required
        minLength="2"
        maxLength="200"
        id="description"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="description-input-error form__input-error"></span>
      <button
        className="button popup__button"
        type="submit"
        disabled={
          name.length < 2 ||
          name.length > 40 ||
          description.length < 2 ||
          description.length > 200
        }
      >
        Salvar
      </button>
    </form>
  );
}
