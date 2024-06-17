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
import Footer from "./components/Footer";
import CriacaoServico from "./pages/CriarServicos";

const App = () => (
  <Router>
    <div className="App">
      <Toaster />
      <Sidenav />

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
          <Route
            path="/criar-servicos"
            element={<ProtectedRoute component={CriacaoServico} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
