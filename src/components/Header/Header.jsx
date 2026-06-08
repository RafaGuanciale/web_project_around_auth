import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import menuIcon from "../../images/sandwich.png";
import closeIcon from "../../images/close.svg";

function Header() {
  const location = useLocation();
  const { isLogged, logout, email } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function headerLink() {
    if (location.pathname === "/signup") {
      return "Faça o login";
    } else if (location.pathname === "/signin") {
      return "Entrar";
    }
  }

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {isLogged && isMenuOpen && (
        <div className="header__mobile-menu">
          <p className="header__mobile-email">{email}</p>

          <Link to="/signin" onClick={logout} className="header__mobile-link">
            Sair
          </Link>
        </div>
      )}

      <header className="header page__section">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />

        {isLogged ? (
          <>
            <div className="header__profile">
              <span className="header__link">{email}</span>

              <Link to="/signin" onClick={logout} className="header__link">
                Sair
              </Link>
            </div>

            <button
              className="header__menu-button"
              onClick={handleMenuToggle}
              type="button"
            >
              <img
                src={isMenuOpen ? closeIcon : menuIcon}
                alt={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              />
            </button>
          </>
        ) : (
          <Link className="header__link">{headerLink()}</Link>
        )}
      </header>
    </>
  );
}

export default Header;
