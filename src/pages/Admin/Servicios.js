import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

// --- API ---
import { getServicioApi } from "../../api/servicios";

// --- Componente ---
import ServiciosComponent from "../../components/Admin/Servicios";
import { Empty, Alert } from "antd";

export default function Servicios() {
  const { user } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [reloadServicios, setReloadServicios] = useState(false);

  useEffect(() => {
    getServicioApi().then((response) => {
      setServicios(response.servicio);

      const sectionArray = [];
      response.servicio.forEach((item) => {
        sectionArray.push(item.section);
      });
      for (var i = sectionArray.length - 1; i >= 0; i--) {
        if (sectionArray.indexOf(sectionArray[i]) !== i) {
          sectionArray.splice(i, 1);
        }
      }
      setSecciones(sectionArray);
    });

    setReloadServicios(false);
  }, [reloadServicios]);

  if (user.role === "colaborador externo") {
    return (
      <div className='no-autorizado'>
        <Alert
          message='Solo los Administradores y Editores pueden modificar los servicios en el Panel
          de Administración'
          type='error'
          showIcon
        />
        <p>
          Tu perfil está configurado cómo:{"  "}
          <strong>{user.role.toUpperCase()}</strong>
        </p>

        <Empty />
      </div>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Admin | Servicios</title>
          <meta
            name='admin-servicios'
            content='Admin | Servicios'
            data-react-helmet='true'
          />
        </Helmet>
        <div>
          <ServiciosComponent
            secciones={secciones}
            servicios={servicios}
            setReloadServicios={setReloadServicios}
          />
        </div>
      </>
    );
  }
}
