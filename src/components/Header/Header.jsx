import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header() {
  const location = useLocation();
  const { isLogged } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);

  function headerLink() {
    if (location.pathname === "/signup") {
      return "Faça o login";
    } else if (location.pathname === "/signin") {
      return "Entrar";
    }
  }

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      <Link className="header__link">{isLogged ? currentUser.name : ""}</Link>
      <Link className="header__link">{isLogged ? "sair" : headerLink()}</Link>
    </header>
  );
}

export default Header;
