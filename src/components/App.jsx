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
import { register, authorize, checkToken } from "../utils/auth.js";
import InfoTooltip from "./Main/components/Popup/components/InfoTooltip/InfoTooltip.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { getToken } from "../utils/token.js";
import AppSkeleton from "./Loading/Loading.jsx";

function App() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(!!getToken());

  const navigate = useNavigate();
  const {onLogin } = useContext(AuthContext);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    api.getCards().then((res) => setCards(res));
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((data) => {
        onLogin({
          token: jwt,
          email: data.data.email,
        });
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    register(email, password)
      .then(() => {
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
    authorize(email, password).then((data) => {
      onLogin({ email, token: data.token });
      navigate("/");
    });
  };

  if (loading) {
    return <AppSkeleton />;
  }

  return (
    <div className="page__content">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main
                cards={cards}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlace={handleAddPlaceSubmit}
                popup={popup}
              />
            </ProtectedRoute>
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
