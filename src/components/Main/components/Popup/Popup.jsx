export default function Popup(props) {
  const { title, children, onClose } = props;
  return (
    <div className="popup">
      <div
        className={`popup__content ${!title ? "popup__content-image" : ""}`}
      >
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
