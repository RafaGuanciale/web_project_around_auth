export default function ImagePopup(props) {
  const { card } = props;
  return (
    <div>
      <img alt={card.name} className="popup__image" src={card.link} />
      <p className="popup__caption">{card.name}</p>
    </div>
  );
}
