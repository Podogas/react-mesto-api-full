import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import mestoApi from "../../utils/Api.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup.js";
import ConfirmDeletionPopup from "../ConfirmDeletionPopup/ConfirmDeletionPopup.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import authFail from "../../images/auth-fail.jpg";
import authSucsess from "../../images/auth-sucsess.jpg";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = useState(
    false
  );
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [cards, setCards] = useState([]);
  const [authPopupContent, setAuthPopupContent] = useState({});
  const [infoTooltipVisible, setInfoTooltipVisible] = useState(false);
  const history = useHistory();
  // проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log("check token")
    if (jwt) { console.log(jwt)
      mestoApi
        .getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, history])
  React.useEffect(() => {
    mestoApi
      .getPageData()
      .then(([profileData, initialCards]) => {
        setCurrentUser(profileData);
        setCards(initialCards);
      })
      .catch((err) =>
        console.error(`Ошибка при загрузке данных пользователя ${err}`)
      );
  }, []);



  // Регистрация
  function handleSignup(password, email) {
    mestoApi
      .signUp(escape(password), email)
      .then(() => {
        setAuthPopupContent({
          imageSrc: authSucsess,
          alt: "Галочка",
          text: "Вы успешно зарегистрировались",
        });
        history.push("/signin");
      })
      .catch((err) =>
        setAuthPopupContent({
          imageSrc: authFail,
          alt: "Красный крест",
          text: "Что-то пошло не так! Попробуйте еще раз.",
        })
      )
      .finally(() => {
        setInfoTooltipVisible(true);
      });
  }

  // авторизация
  function handleSignin(password, email) {
    mestoApi
      .signIn(escape(password), email)
      .then((data) => {
        setEmail(data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  // выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
    history.push("/sign-in");
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleCardConfirmDeletion = (card) => {
    setIsConfirmDeletionPopupOpen(!isConfirmDeletionPopupOpen);
    setCardToDelete(card);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsConfirmDeletionPopupOpen(false);
    setInfoTooltipVisible(false);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleUpdateUser = (data) => {
    mestoApi
      .patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.error(`Ошибка при загрузке данных пользователя ${err}`)
      );
  };
  const handleUpdateAvatar = (url) => {
    mestoApi
      .patchAvatar(url.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка ${err}`));
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const method = isLiked ? "DELETE" : "PUT";
    mestoApi
      .like(card._id, method)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error(`Ошибка ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    mestoApi
      .postNewCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка ${err}`));
  }
  function handleCardDeletion() {
    mestoApi
      .deleteCard(cardToDelete._id)
      .then((deleledCard) => {
        const newCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(newCards);
      })
      .catch((err) => console.error(`Ошибка ${err}`));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onClick={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardConfirmDeletion}
          />
          <Route path="/sign-in">
            <Login onSubmit={handleSignin} />
          </Route>
          <Route path="/sign-up">
            <Register onSubmit={handleSignup} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {infoTooltipVisible ? (
          <InfoTooltip
            isOpen={infoTooltipVisible}
            onClose={closeAllPopups}
            content={authPopupContent}
          />
        ) : (
          ""
        )}
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmDeletionPopup
          isOpen={isConfirmDeletionPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeletion}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
