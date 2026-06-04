import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="authPage__container">
      <p className="authPage__title">Entrar</p>
      <form className="authPage__form">
        <div className="authPage__form__input">
          <input
            id="email"
            className="authPage__input__input"
            type="text"
            placeholder="E-mail"
            name="email"
            // value={data.name}
            // onChange={handleChange}
          />
        </div>
        <div className="authPage__form__input">
          <input
            id="password"
            className="authPage__input__input"
            type="password"
            placeholder="Senha"
            name="password"
            // value={data.username}
            // onChange={handleChange}
          />
        </div>
        <button className="authPage__button" type="submit">
          Entrar
        </button>
      </form>
      <p className="authPage__login__link">
        Ainda não é membro? Inscreva-se{" "}
        <Link to={"/signup"} className="authPage__login__link">
          aqui!
        </Link>
      </p>
    </div>
  );
}

export default Login;
