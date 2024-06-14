import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const schema = z
  .object({
    senhaAtual: z
      .string()
      .min(6, { message: "Senha atual deve ter pelo menos 6 caracteres" }),
    novaSenha: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
      .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
      .regex(/[A-Z]/, {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[@#$%&*!?/\\|+\-_=]/, {
        message: "A senha deve conter pelo menos um caractere especial",
      }),
    confirmarSenha: z.string().min(6, { message: "Confirme sua nova senha" }),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"], // path of error
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
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
      const response = await axios.post(
        "http://localhost:5000/trocar-senha",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "sucesso") {
        alert("Senha trocada com sucesso!");
      } else {
        alert("Erro ao trocar senha");
      }
    } catch (error) {
      console.error("Erro ao trocar senha", error);
      alert("Erro ao trocar senha");
    }
  };

  return (
    <div className="esqueceu-senha-container">
      <h2>Trocar Senha</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="esqueceu-senha-form">
        <div className="form-group">
          <label htmlFor="senhaAtual">Senha Atual</label>
          <input type="password" id="senhaAtual" {...register("senhaAtual")} />
          {errors.senhaAtual && (
            <p className="error-message">{errors.senhaAtual.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="novaSenha">Nova Senha</label>
          <input type="password" id="novaSenha" {...register("novaSenha")} />
          {errors.novaSenha && (
            <p className="error-message">{errors.novaSenha.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            {...register("confirmarSenha")}
          />
          {errors.confirmarSenha && (
            <p className="error-message">{errors.confirmarSenha.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Atualizar Senha
        </button>
      </form>
    </div>
  );
};

export default TrocarSenha;
