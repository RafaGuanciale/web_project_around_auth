import { useState, useEffect, useContext } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Popup from "./Main/components/Popup/Popup.jsx";
import api from "../utils/api";
import { CurrentUserProvider } from "../contexts/CurrentUserContext.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./Main/components/Popup/components/InfoTooltip/InfoTooltip.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

function App() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
    auth
      .register(email, password)
      .then((res) => {
        handleOpenPopup({
          children: <InfoTooltip isSuccess={true} />,
        });
        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
        handleOpenPopup({
          children: <InfoTooltip isSuccess={false} />,
        });
        return;
      });
  };

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password).then((data) => {
      login({ email, token: data.token });
      console.log(data);
      navigate("/");
    });
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
              <LoginPage handleLogin={handleLogin} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  );
}

export default App;
