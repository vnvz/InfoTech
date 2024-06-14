import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  serviceDate: z.preprocess(
    (arg) => new Date(arg),
    z
      .date()
      .refine((date) => !isNaN(date.getTime()), { message: "Data inválida" })
  ),
  serviceType: z.enum(
    ["installation", "maintenance", "support", "consulting"],
    { required_error: "Selecione um tipo de serviço" }
  ),
  serviceDescription: z.string().nonempty({ message: "Campo obrigatório" }),
});

const SolicitacaoServicos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const solicitarServico = async (data) => {
    const token = localStorage.getItem("token"); // Assumindo que o token JWT está armazenado no localStorage
    return await axios.post("http://localhost:5000/solicitacoes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const onSubmit = async (data) => {
    try {
      schema.parse(data);

      await solicitarServico(data).then((res) => {
        if (res.data.status === "sucesso") {
          alert("Solicitação realizada com sucesso!");
        } else {
          alert("Erro ao realizar solicitação");
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        alert("Houve um erro ao realizar a solicitação.");
      }
    }
  };

  return (
    <div className="content">
      <h2>Solicitação de Serviços</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="serviceDate">Data da Solicitação:</label>
          <input type="date" id="serviceDate" {...register("serviceDate")} />
          {errors.serviceDate && (
            <span className="error-message">{errors.serviceDate.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="serviceType">Tipo de Serviço:</label>
          <select id="serviceType" {...register("serviceType")}>
            <option value="installation">Instalação</option>
            <option value="maintenance">Manutenção</option>
            <option value="support">Suporte Técnico</option>
            <option value="consulting">Consultoria</option>
          </select>
          {errors.serviceType && (
            <span className="error-message">{errors.serviceType.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="serviceDescription">Descrição do Serviço:</label>
          <textarea
            id="serviceDescription"
            rows="4"
            {...register("serviceDescription")}
          ></textarea>
          {errors.serviceDescription && (
            <span className="error-message">
              {errors.serviceDescription.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <button type="submit">Solicitar Serviço</button>
          <button type="reset">Limpar</button>
          <button type="button" onClick={() => window.history.back()}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolicitacaoServicos;
