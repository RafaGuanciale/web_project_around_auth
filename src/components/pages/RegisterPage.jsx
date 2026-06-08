import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage({ handleRegistration }) {
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
    handleRegistration(data);
  };
  
  return (
    <div className="authPage__container">
      <p className="authPage__title">Inscrever-se</p>
      <form className="authPage__form" onSubmit={handleSubmit}>
        <div className="authPage__input__input">
          <input
            id="email"
            className="authPage__input__input"
            type="email"
            placeholder="E-mail"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="authPage__input__input">
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
          Inscrever-se
        </button>
      </form>
      <p className="authPage__login__link">
        Já é um membro? Faça o login{" "}
        <Link to={"/signin"} className="authPage__login__link">
          aqui!
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
