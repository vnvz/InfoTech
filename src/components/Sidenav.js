import React from "react";
import logo from "../img/logo_empresa.png";
import { Link } from "react-router-dom";
import formaPagamento1 from "../img/formas_pagamento/forma_pagamento1.png";
import formaPagamento2 from "../img/formas_pagamento/forma_pagamento2.png";

const Sidenav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecionar para a página de login
  };
  return (
    <div class="sidenav">
      <img src={logo} alt="InfoTech Soluções em TI" class="img-fluid" />
      <h1>InfoTech</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/solicitacao-servicos">Solicitação de Serviços</Link>
        </li>
        <li>
          <Link to="/servicos-solicitados">Serviços Solicitados</Link>
        </li>
        <li>
          <Link to="/cadastro-pagamento">Cadastro de Pagamento</Link>
        </li>
        <li>
          <Link to={"/criar-servicos"}>Criar Serviços</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
