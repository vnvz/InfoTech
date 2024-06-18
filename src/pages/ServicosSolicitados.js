import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

const ViewServices = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/solicitacoes",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setServices(response.data.data);
        } catch (error) {
          console.error("Erro ao buscar serviços", error);
          toast.error("Erro ao buscar serviços");
        }
      } else {
        alert("Você precisa estar logado para ver os serviços solicitados");
      }
    };

    fetchServices();
  }, []);

  const getStatus = (serviceDate, duration) => {
    const today = moment().startOf("day");
    const serviceEndDay = moment(serviceDate)
      .add(duration, "days")
      .startOf("day");
    if (serviceEndDay.isBefore(today)) {
      return "Completo";
    } else {
      return "Em elaboração";
    }
  };

  const getRemainingDays = (serviceDate, duration) => {
    const today = moment().startOf("day");
    const serviceEndDay = moment(serviceDate)
      .add(duration, "days")
      .startOf("day");
    if (serviceEndDay.diff(today, "days") <= 0) {
      return 0;
    } else {
      return serviceEndDay.diff(today, "days");
    }
  };

  const handleCancel = (service) => {
    setSelectedService(service);
  };

  const confirmCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/solicitacoes/${selectedService.order}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(
        services.filter((service) => service.order !== selectedService.order)
      );
      toast.success("Serviço cancelado com sucesso");
    } catch (error) {
      toast.error("Erro ao cancelar o serviço. Tente novamente.");
    }
  };

  return (
    <div className="servicos-solicitados">
      <h2>Serviços Solicitados</h2>
      <table>
        <thead>
          <tr>
            <th>Ordem</th>
            <th>Data</th>
            <th>Tipo de Serviço</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Tempo Restante</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.order + 1}</td>
              <td>{moment(service.serviceDate).format("DD/MM/YYYY")}</td>
              <td>{service.serviceType}</td>
              <td>{service.serviceDescription}</td>
              <td>{service.servicePrice}</td>
              <td>{getStatus(service.serviceDate, service.duration)}</td>
              <td>
                {getRemainingDays(service.serviceDate, service.duration)} dias
                restantes
              </td>
              <td>
                <input type="checkbox" onChange={() => handleCancel(service)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={confirmCancel}>
        Cancelar Selecionados
      </button>
    </div>
  );
};

export default ViewServices;
