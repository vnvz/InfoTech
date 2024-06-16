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

// In-memory storage for users, services, and payment methods
const users = [];
const services = [];
const paymentMethods = [];

// Variable to track the global order of services
let serviceOrder = 0;

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
  res.json({
    status: "sucesso",
    token,
    user: { email: user.email, nome: user.nome },
  });
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
  const { serviceDate, serviceType, serviceDescription, servicePrice } =
    req.body;
  const userId = req.user.id;

  const service = {
    userId,
    serviceDate,
    serviceType,
    serviceDescription,
    servicePrice,
    requestedAt: new Date(),
    order: serviceOrder++,
  };
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
app.post("/trocar-senha", async (req, res) => {
  const { email, novaSenha, confirmarSenha } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: "Email não cadastrado" });
  }

  if (novaSenha !== confirmarSenha) {
    return res
      .status(400)
      .json({ status: "error", message: "As senhas não coincidem" });
  }

  const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
  user.senha = hashedNewPassword;
  res.json({ status: "sucesso" });
});

// Route to get available payment methods
app.get("/meios-de-pagamento", (req, res) => {
  res.json(paymentMethods);
});

// Route to add a payment method (for testing purposes)
app.post("/meios-de-pagamento", (req, res) => {
  const { sigla, nome, valorMaximo, meioEletronico } = req.body;

  const existingMethod = paymentMethods.find(
    (method) => method.sigla === sigla
  );
  if (existingMethod) {
    return res
      .status(400)
      .json({ status: "error", message: "Sigla already in use" });
  }

  const paymentMethod = { sigla, nome, valorMaximo, meioEletronico };
  paymentMethods.push(paymentMethod);
  res.json({ status: "sucesso", data: paymentMethod });
});

// Route to handle service creation with payment methods
app.post("/servicos/add", authenticate, (req, res) => {
  const { nome, descricao, valor, meiosDePagamentoIds } = req.body;

  // Filter valid payment methods
  const validPaymentMethods = paymentMethods.filter(
    (method) =>
      method.valorMaximo >= valor && meiosDePagamentoIds.includes(method.sigla)
  );

  if (validPaymentMethods.length === 0) {
    return res.status(400).json({
      status: "error",
      message:
        "Nenhum meio de pagamento válido encontrado para o valor do serviço",
    });
  }

  const service = {
    nome,
    descricao,
    valor,
    meiosDePagamento: validPaymentMethods.map((method) => method.sigla),
  };

  services.push(service);
  res.status(201).json({ status: "sucesso", data: service });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
