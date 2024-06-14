import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import SolicitacaoServicos from "./pages/SolicitacaoServicos";
import TrocarSenha from "./pages/TrocarSenha";
import Sidenav from "./components/Sidenav";
import ViewServices from "./pages/ServicosSolicitados";

const App = () => (
  <Router>
    <div className="App">
      <Sidenav />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/solicitacao-servicos"
            element={<SolicitacaoServicos />}
          />
          <Route path="/trocar-senha" element={<TrocarSenha />} />
          <Route path="/servicos-solicitados" element={<ViewServices />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
