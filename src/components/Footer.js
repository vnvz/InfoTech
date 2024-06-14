import React from 'react';
import formaPagamento1 from '../img/formas_pagamento/forma_pagamento1.png';
import formaPagamento2 from '../img/formas_pagamento/forma_pagamento2.png';

const Footer = () => (
    <footer>
      <ul className="contact-info">
        <li>Email: contato@infotech.com</li>
        <li>TTelefone: (81) 3422-1234</li>
        <li>WhatsApp: (81) 92415-52345</li>
        <li>Avenida Cais do Apolo, 77 Recife/PE</li>
        <li>CEP: 50030-903</li>
      </ul>
      <div className="payment-icons">
        <img src={formaPagamento1} alt="Payment Icon 1" />
        <img src={formaPagamento2} alt="Payment Icon 2" />
      </div>
    </footer>
);

export default Footer;
