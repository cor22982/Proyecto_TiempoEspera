import InsttutionComponent from "@components/Cards/InstitutionCard/InstitutionCard";
import "./HomeSearch.css";

const Principal = ({ ira, datos, setobj, pi }) => {
  const onclick = (id_i, id_p, nam_i, nam_p, pi, url) => {
    ira(false);
    const objeto_ids = {
      id_institutions: id_i,
      id_procedure: id_p,
      name_institutions: nam_i,
      name_procedure: nam_p,
      pi_user: pi,
      url: url,
    };
    setobj(objeto_ids);
  };

  return (
    <div className="componentes-1">
      {datos.map((dato, index) => (
        <InsttutionComponent
          key={index}
          procedimiento={dato.name_procedure}
          name={dato.name}
          image={dato.imagen}
          onClick={() =>
            onclick(
              dato.id_institutions,
              dato.id_procedure,
              dato.name,
              dato.name_procedure,
              pi,
              dato.procedure_url
            )
          }
          tiempo="0:00"
        />
      ))}
    </div>
  );
};

export default Principal;
