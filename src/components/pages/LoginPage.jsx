import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="authPage__container">
      <p className="authPage__title">Entrar</p>
      <form className="authPage__form" onSubmit={handleSubmit}>
        <div className="authPage__form__input">
          <input
            id="email"
            className="authPage__input__input"
            type="text"
            placeholder="E-mail"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="authPage__form__input">
          <input
            id="password"
            className="authPage__input__input"
            type="password"
            placeholder="Senha"
            name="password"
            value={data.password}
            onChange={handleChange}
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
