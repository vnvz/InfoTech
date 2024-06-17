import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SolicitacaoServicos = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [servicos, setServicos] = useState([]);
  const [meiosPagamento, setMeiosPagamento] = useState([]);
  const [filteredMeiosPagamento, setFilteredMeiosPagamento] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedServiceType = watch("serviceType");

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/servicos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServicos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar os serviços");
      }
    };

    const fetchMeiosPagamento = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/meios-de-pagamento"
        );
        setMeiosPagamento(response.data);
      } catch (error) {
        toast.error("Erro ao carregar os meios de pagamento");
      }
    };

    fetchServicos();
    fetchMeiosPagamento();
  }, []);

  useEffect(() => {
    if (selectedServiceType) {
      const selectedService = servicos.find(
        (servico) => servico.nome === selectedServiceType
      );
      if (selectedService) {
        const filtered = meiosPagamento.filter(
          (meio) => meio.valorMaximo >= selectedService.valor
        );
        setFilteredMeiosPagamento(filtered);
      }
    }
  }, [selectedServiceType, servicos, meiosPagamento]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/solicitacoes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Serviço solicitado com sucesso!");
      reset();
    } catch (error) {
      toast.error(
        "Erro ao solicitar serviço. Tente novamente. " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Solicitar Serviço</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="serviceType">Tipo de Serviço</label>
          <select
            id="serviceType"
            {...register("serviceType")}
            className="form-control"
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.nome} value={servico.nome}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serviceDescription">Descrição do Serviço</label>
          <textarea
            id="serviceDescription"
            {...register("serviceDescription")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceDate">Data do Serviço</label>
          <input
            type="date"
            id="serviceDate"
            {...register("serviceDate")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Meio de Pagamento</label>
          <select
            id="paymentMethod"
            {...register("paymentMethod")}
            className="form-control"
          >
            <option value="">Selecione um meio de pagamento</option>
            {filteredMeiosPagamento.map((meio) => (
              <option key={meio.sigla} value={meio.sigla}>
                {meio.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Solicitando..." : "Solicitar Serviço"}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default SolicitacaoServicos;
