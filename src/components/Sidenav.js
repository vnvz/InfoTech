import React from "react";
import logo from "../img/logo_empresa.png";
import { Link } from "react-router-dom";
import formaPagamento1 from "../img/formas_pagamento/forma_pagamento1.png";
import formaPagamento2 from "../img/formas_pagamento/forma_pagamento2.png";

const Sidenav = () => (
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
    </ul>

    <footer class="container">
      <div class="info">
        <h4>Informações de Contato</h4>
        <p>Telefone: (81) 3422-1234</p>
        <p>WhatsApp: (81) 92415-52345</p>
        <p>Avenida Cais do Apolo, 77 Recife/PE</p>
        <p>CEP: 50030-903</p>
      </div>

      <div class="payment-methods">
        <h4>Formas de pagamento</h4>
        <img
          src={formaPagamento1}
          alt="Forma de Pagamento 1"
          class="img-fluid"
        />
        <img
          src={formaPagamento2}
          alt="Forma de Pagamento 2"
          class="img-fluid"
        />
      </div>
    </footer>
  </div>
);

export default Sidenav;
