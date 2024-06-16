import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ViewServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
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
          alert("Erro ao buscar serviços");
        }
      } else {
        alert("Você precisa estar logado para ver os serviços solicitados");
      }
    };

    fetchServices();
  }, []);

  const getStatus = (serviceDate) => {
    const today = moment().startOf("day");
    const serviceDay = moment(serviceDate).startOf("day");
    if (serviceDay.isBefore(today)) {
      return "Completo";
    } else if (serviceDay.isSame(today)) {
      return "Em andamento";
    } else {
      return "Agendado";
    }
  };

  const getRemainingDays = (serviceDate) => {
    const today = moment().startOf("day");
    const serviceDay = moment(serviceDate).startOf("day");
    return serviceDay.diff(today, "days");
  };

  return (
    <div className="content">
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
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.order}</td>
              <td>{moment(service.serviceDate).format("DD/MM/YYYY")}</td>
              <td>{service.serviceType}</td>
              <td>{service.serviceDescription}</td>
              <td>{service.servicePrice}</td>
              <td>{getStatus(service.serviceDate)}</td>
              <td>{getRemainingDays(service.serviceDate)} dias restantes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewServices;
