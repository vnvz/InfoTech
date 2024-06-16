import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
          toast.success("Login realizado com sucesso!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error("Email ou senha inválidos");
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        toast.error(
          "Houve um erro ao realizar o login. " + error.response.data.message
        );
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
        <button type="reset">Limpar</button>
      </form>
      <li>
        <Link to="/cadastro">Cadastrar-se</Link>
      </li>
      <li>
        <Link to="/trocar-senha">Esqueci minha senha</Link>
      </li>
    </div>
  );
};

export default Login;
