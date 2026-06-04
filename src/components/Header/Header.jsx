import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  const location = useLocation();
  const { isLogged, user, logout } = useContext(AuthContext);

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
      <div className="header__profile">
        <Link className="header__link">{isLogged ? user.email : ""}</Link>
        <Link to="signin" onClick={logout} className="header__link">{isLogged ? "Sair" : headerLink()}</Link>
      </div>
    </header>
  );
}

export default Header;
