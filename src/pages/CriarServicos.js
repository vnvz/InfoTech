import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

const serviceSchema = z.object({
  nome: z.string().nonempty({ message: "Nome é obrigatório" }),
  dias: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, { message: "A quantidade de dias deve ser maior que zero" })
  ),
  valor: z.preprocess(
    (val) => Number(val),
    z.number().min(0.01, { message: "O custo deve ser maior que zero" })
  ),
});

const CriacaoServico = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/servicos/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Serviço criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar o serviço. Tente novamente." + error.message);
    }
  };

  return (
    <div className="criar-servico">
      <h2>Criar Serviço</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Serviço</label>
          <input
            type="text"
            id="nome"
            {...register("nome")}
            className={`form-control ${errors.nome ? "is-invalid" : ""}`}
          />
          {errors.nome && (
            <div className="invalid-feedback">{errors.nome.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dias">Quantidade de Dias</label>
          <input
            type="number"
            id="dias"
            {...register("dias")}
            className={`form-control ${errors.dias ? "is-invalid" : ""}`}
          />
          {errors.dias && (
            <div className="invalid-feedback">{errors.dias.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="valor">Custo (R$)</label>
          <input
            type="number"
            id="valor"
            step="0.01"
            {...register("valor")}
            className={`form-control ${errors.valor ? "is-invalid" : ""}`}
          />
          {errors.valor && (
            <div className="invalid-feedback">{errors.valor.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Serviço
        </button>
      </form>
    </div>
  );
};

export default CriacaoServico;
