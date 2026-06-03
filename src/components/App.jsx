import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((res) => setCurrentUser(res));
    })();
  }, []);
  
    useEffect(() => {
    api.getCards().then((res) => setCards(res));
  }, []);

  const handleUpdateUser = async (data) => {
    await api
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };
  const handleUpdateAvatar = async (data) => {
    await api.updateProfilePicture(data).then((res) => {
      setCurrentUser(res);
      handleClosePopup();
    });
  };
  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }
  async function handleAddPlaceSubmit(data) {
    await api.createNewCard(data).then((res) => {
      setCards([res, ...cards]);
      handleClosePopup();
    });
  }
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          popup={popup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
