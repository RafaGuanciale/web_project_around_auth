import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import { CurrentUserProvider } from "../contexts/CurrentUserContext.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import * as auth from "../utils/auth.js";

function App() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    api.getCards().then((res) => setCards(res));
  }, []);

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

  const handleRegistration = ({ email, password }) => {
    console.log(email, password);
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        //popup de confirmação de registro
        navigate("/signin");
      })
      .catch(console.error);
  };

  return (
    <div className="page__content">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              cards={cards}
              onOpenPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              popup={popup}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute anonymous>
              <RegisterPage handleRegistration={handleRegistration} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRoute anonymous>
              <LoginPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
