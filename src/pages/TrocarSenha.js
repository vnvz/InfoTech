import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

const schema = z
  .object({
    email: z.string().email("Email inválido").nonempty("O email é obrigatório"),
    novaSenha: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(
        /[@#$%&*!?/\\|+\-=._]/,
        "A senha deve conter pelo menos um caractere especial (@ # $ % & * ! ? / \\ | - _ + . =)"
      ),
    confirmarSenha: z.string().nonempty("A confirmação da senha é obrigatória"),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

const TrocarSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/trocar-senha",
        data
      );
      if (response.data.status === "sucesso") {
        toast.success("Senha trocada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao trocar senha. " + error.response.data.message);
    }
  };

  return (
    <div className="trocar-senha-container container">
      <h2>Trocar Senha</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Nova Senha</label>
          <input type="password" {...register("novaSenha")} />
          {errors.novaSenha && (
            <p className="error-message">{errors.novaSenha.message}</p>
          )}
          <small className="form-text text-muted">
            A senha deve ter pelo menos 6 caracteres, sendo pelo menos: um dos
            caracteres numérico, um dos caracteres letra maiúscula, e um dos
            caracteres especiais abaixo.
            <br />@ # $ % & * ! ? / \ | - _ + . =
          </small>
        </div>
        <div className="form-group">
          <label>Confirmar Nova Senha</label>
          <input type="password" {...register("confirmarSenha")} />
          {errors.confirmarSenha && (
            <p className="error-message">{errors.confirmarSenha.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Trocar Senha
        </button>
      </form>
    </div>
  );
};

export default TrocarSenha;
