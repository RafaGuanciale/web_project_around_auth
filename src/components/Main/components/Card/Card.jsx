import { useEffect, useContext } from "react";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.jsx";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { onClick, onCardLike, onCardDelete } = props;

  const imagePopup = { children: <ImagePopup card={props.card} /> };
  const removeCardPopup = {
    title: "Tem certeza?",
    children: <RemoveCard onCardDelete={onCardDelete} card={props.card} />,
  };
  const { currentUser } = useContext(CurrentUserContext);
  const handleCardLike = () => onCardLike(props.card);

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onClick(imagePopup)}
      />
      <button
        aria-label="Excluir cartão"
        className="card__delete-button"
        type="button"
        onClick={() => onClick(removeCardPopup)}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botão de curtir"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
          type="button"
          onClick={handleCardLike}
        />
      </div>
    </li>
  );
}
