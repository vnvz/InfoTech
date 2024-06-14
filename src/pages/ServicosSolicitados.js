import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="content">
      <h2>Serviços Solicitados</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo de Serviço</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{new Date(service.serviceDate).toLocaleDateString()}</td>
              <td>{service.serviceType}</td>
              <td>{service.serviceDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewServices;
