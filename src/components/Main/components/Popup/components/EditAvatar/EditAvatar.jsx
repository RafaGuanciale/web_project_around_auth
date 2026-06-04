import { useState, useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.jsx";

export default function EditAvatar() {
  const avatarRef = useRef();
  const {handleUpdateAvatar} = useContext(CurrentUserContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form form popup__form-avatar"
      id="avatar-form"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-avatar"
        name="link"
        placeholder="Link de Imagem"
        required
        type="url"
        id="link"
        ref={avatarRef}
      />
      <span className="link-input-error form__input-error"></span>
      <button
        className="button popup__button popup__button-avatar"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}
