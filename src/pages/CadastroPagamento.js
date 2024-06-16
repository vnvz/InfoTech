import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

const schema = z.object({
  sigla: z.string().length(3, "A sigla deve ter 3 caracteres"),
  nome: z.string().nonempty("O nome é obrigatório"),
  valorMaximo: z.number().positive("O valor máximo deve ser maior que zero"),
  meioEletronico: z.boolean(),
});

const CadastroPagamento = () => {
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
        "http://localhost:5000/meios-de-pagamento",
        data
      );
      if (response.data.status === "sucesso") {
        toast.success("Cadastro de pagamento realizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao cadastrar meio de pagamento.");
      console.error("Erro ao cadastrar meio de pagamento:", error);
    }
  };

  return (
    <div className="cadastro-pagamento-container container">
      <h2>Cadastro de Pagamento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Sigla</label>
          <input type="text" {...register("sigla")} />
          {errors.sigla && (
            <p className="error-message">{errors.sigla.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Nome</label>
          <input type="text" {...register("nome")} />
          {errors.nome && (
            <p className="error-message">{errors.nome.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Valor Máximo</label>
          <input
            type="number"
            step="0.01"
            {...register("valorMaximo", { valueAsNumber: true })}
          />
          {errors.valorMaximo && (
            <p className="error-message">{errors.valorMaximo.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Indicador de Meio Eletrônico</label>
          <input type="checkbox" {...register("meioEletronico")} />
          {errors.meioEletronico && (
            <p className="error-message">{errors.meioEletronico.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroPagamento;
