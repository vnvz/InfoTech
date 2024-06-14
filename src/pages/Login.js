import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the validation schema using zod
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
    mode: "onChange",
  });

  const login = async (email, senha) => {
    return await axios.post("http://localhost:5000/login", {
      email,
      senha,
    });
  };

  const onSubmit = async (data) => {
    try {
      loginSchema.parse(data);

      await login(data.email, data.senha).then((res) => {
        if (res.data.status === "sucesso") {
          alert("Login realizado com sucesso!");
          // Armazene o token no localStorage ou cookie, conforme necessário
          localStorage.setItem("token", res.data.token);
        } else {
          alert("Email ou senha inválidos");
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        alert("Houve um erro ao realizar o login.");
      }
    }
  };

  return (
    <div className="login-container container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" {...register("senha")} />
          {errors.senha && (
            <p className="error-message">{errors.senha.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link to="/cadastro">Cadastrar-se</Link>
      <Link to="/trocar-senha">Esqueci minha senha</Link>
    </div>
  );
};

export default Login;
