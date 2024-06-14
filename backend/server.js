const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a strong secret key

app.use(bodyParser.json());
app.use(cors());

// In-memory storage for users and services
const users = [];
const services = [];

// Registration route
app.post("/cadastro", async (req, res) => {
  const {
    email,
    senha,
    nome,
    cpf,
    dataNascimento,
    telefone,
    estadoCivil,
    escolaridade,
  } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);
  const user = {
    email,
    senha: hashedPassword,
    nome,
    cpf,
    dataNascimento,
    telefone,
    estadoCivil,
    escolaridade,
  };
  users.push(user);
  res.json({ status: "sucesso" });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: "Email ou senha inválidos" });
  }

  const isMatch = await bcrypt.compare(senha, user.senha);
  if (!isMatch) {
    return res
      .status(400)
      .json({ status: "error", message: "Email ou senha inválidos" });
  }

  const token = jwt.sign({ id: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ status: "sucesso", token });
});

// Middleware to authenticate using JWT
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: "error", message: "Acesso negado" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ status: "error", message: "Token inválido" });
  }
};

// Route to handle service requests
app.post("/solicitacoes", authenticate, (req, res) => {
  const { serviceDate, serviceType, serviceDescription } = req.body;
  const userId = req.user.id;

  const service = { userId, serviceDate, serviceType, serviceDescription };
  services.push(service);

  res.json({ status: "sucesso", data: service });
});

// Route to get all service requests for the authenticated user
app.get("/solicitacoes", authenticate, (req, res) => {
  const userId = req.user.id;
  const userServices = services.filter((service) => service.userId === userId);
  res.json({ status: "sucesso", data: userServices });
});

// Route to change password
app.post("/trocar-senha", authenticate, async (req, res) => {
  const { senhaAtual, novaSenha } = req.body;
  const userId = req.user.id;

  const user = users.find((user) => user.email === userId);
  if (!user) {
    return res.status(400).json({ status: "error", message: "User not found" });
  }

  const isMatch = await bcrypt.compare(senhaAtual, user.senha);
  if (!isMatch) {
    return res
      .status(400)
      .json({ status: "error", message: "Senha atual incorreta" });
  }

  const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
  user.senha = hashedNewPassword;
  res.json({ status: "sucesso" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
