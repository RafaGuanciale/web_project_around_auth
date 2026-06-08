export default function RemoveCard(props) {
  const { onCardDelete } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(props.card)
  };

  return (
    <div>
      <form
        className="popup__form form"
        id="confirm-form"
        onSubmit={handleSubmit}
      >
        <button
          className="button popup__button popup__button-confirm"
          type="submit"
        >
          Sim
        </button>
      </form>
    </div>
  );
}
