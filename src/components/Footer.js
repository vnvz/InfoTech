import React from "react";
import formaPagamento1 from "../img/formas_pagamento/forma_pagamento1.png";
import formaPagamento2 from "../img/formas_pagamento/forma_pagamento2.png";

const Footer = () => (
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
      <img src={formaPagamento1} alt="Forma de Pagamento 1" class="img-fluid" />
      <img src={formaPagamento2} alt="Forma de Pagamento 2" class="img-fluid" />
    </div>
  </footer>
);

export default Footer;
