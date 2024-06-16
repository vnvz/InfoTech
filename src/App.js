import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import SolicitacaoServicos from "./pages/SolicitacaoServicos";
import TrocarSenha from "./pages/TrocarSenha";
import Sidenav from "./components/Sidenav";
import ViewServices from "./pages/ServicosSolicitados";
import CadastroPagamento from "./pages/CadastroPagamento";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/IsAuth";
import UserInfo from "./components/UserInfo";

const App = () => (
  <Router>
    <div className="App">
      <Toaster />
      <Sidenav />
      <UserInfo />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/solicitacao-servicos"
            element={<ProtectedRoute component={SolicitacaoServicos} />}
          />
          <Route
            path="/trocar-senha"
            element={<ProtectedRoute component={TrocarSenha} />}
          />
          <Route
            path="/servicos-solicitados"
            element={<ProtectedRoute component={ViewServices} />}
          />
          <Route
            path="/cadastro-pagamento"
            element={<ProtectedRoute component={CadastroPagamento} />}
          />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
