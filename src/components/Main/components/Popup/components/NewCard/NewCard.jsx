import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.jsx";

export default function NewCard() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit({ name: title, link });
  };
  return (
    <form
      className="popup__form form"
      name="new-card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_card-name"
        name="place-name"
        placeholder="Título"
        required
        type="text"
        id="placeName"
        minLength="2"
        maxLength="30"
        value={title}
        onChange={handleChangeTitle}
      />
      <span className="placeName-input-error form__input-error"></span>
      <input
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Link de Imagem"
        required
        type="url"
        id="link"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="link-input-error form__input-error"></span>
      <button
        className="button popup__button"
        type="submit"
        disabled={title.length < 2 || title.length > 40}
      >
        Criar
      </button>
    </form>
  );
}
