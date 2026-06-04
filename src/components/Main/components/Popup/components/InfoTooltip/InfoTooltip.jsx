import sucessLogo from "../../../../../../images/sucess.png";
import failLogo from "../../../../../../images/fail.png";
import { useState } from "react";

export default function InfoTooltip({isSuccess}) {
 
  return (
    <div className="registration__container">
      <img
        src={isSuccess ? sucessLogo : failLogo}
        alt={isSuccess ? "sucess" : "fail"}
        className="registration__logo"
      />
      <p className="registration__text">
        {isSuccess
          ? "Vitória! Você precisa se registrar"
          : "Ops, algo deu errado! Por favor, tente novamente."}
      </p>
    </div>
  );
}
