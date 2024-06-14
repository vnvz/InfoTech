import React from "react";
import foto1 from "../img/foto1.jpeg";
import foto2 from "../img/foto2.jpeg";
import foto3 from "../img/foto3.jpeg";
import foto4 from "../img/foto4.jpeg";

const Home = () => (
  <div className="home content">
    <section className="container my-5 content">
      <h2>Quem somos?</h2>
      <p>
        Fundada em 2004, fruto do empreendedorismo, da perseverança e do
        compromisso com a qualidade de dois jovens Bom-Jardinenses. A InfoTech
        cresceu rapidamente, se tornando referência em tecnologia e serviços na
        região. Oferecendo produtos de alta qualidade, novidades tecnológicas e
        soluções para pessoas e empresas.
      </p>

      <h2>Vídeo Institucional</h2>
      <div className="video-container">
        <iframe
          width="1024"
          height="576"
          src="https://www.youtube.com/embed/TqP2xIxjIFk?si=pFpdLbw1rN8f5rkk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>Galeria de Fotos</h2>
      <div className="gallery">
        <img src={foto1} alt="Foto 1" className="img-fluid" />
        <img src={foto2} alt="Foto 2" className="img-fluid" />
        <img src={foto3} alt="Foto 3" className="img-fluid" />
        <img src={foto4} alt="Foto 4" className="img-fluid" />
      </div>

      <h2>Principais Serviços de TI</h2>
      <p>
        Os principais serviços de TI oferecidos pela InfoTech incluem
        desenvolvimento de software personalizado, consultoria em segurança da
        informação, implementação de infraestrutura de rede e suporte técnico
        especializado. Além disso, a empresa oferece soluções de computação em
        nuvem, desenvolvimento de aplicativos móveis e serviços de análise de
        dados para ajudar os clientes a alcançarem seus objetivos de negócios
        com eficiência e inovação.
      </p>

      <h2>Fundadores da Empresa</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Cargo</th>
            <th>Nome</th>
            <th>CV Breve</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fundador e CEO</td>
            <td>José da Silva</td>
            <td>
              Empreendedor com mais de 20 anos de experiência em tecnologia e
              negócios. Formado em Engenharia da Computação pela Universidade de
              São Paulo.
            </td>
          </tr>
          <tr>
            <td>Co-fundador e CTO</td>
            <td>Maria Oliveira</td>
            <td>
              Especialista em desenvolvimento de software e inovação
              tecnológica. Possui mestrado em Ciências da Computação pela
              Universidade Federal de Pernambuco.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
);

export default Home;
