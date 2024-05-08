import TextArea from "@components/TextArea";
import './Comentarios.css'
import Coment from "@components/Coment";
const Comentarios = () => {
  return (
    <div>
      <TextArea placeholder="Agregar Comentario"></TextArea>
      <br></br>
      <div className="coments">
        <Coment 
          from="Luís Perez"
          date="08/05/2024"
          coment="Asistí a renovar mi DPI, el trámite fue rápido,15 a 20 minutos, el personal fue muy amable y atento.En una semana me lo entregaron, excelente!"></Coment>
        <Coment 
          from="Luís Perez"
          date="08/05/2024"
          coment="Asistí a renovar mi DPI, el trámite fue rápido,15 a 20 minutos, el personal fue muy amable y atento.En una semana me lo entregaron, excelente!"></Coment>
        <Coment 
          from="Luís Perez"
          date="08/05/2024"
          coment="Asistí a renovar mi DPI, el trámite fue rápido,15 a 20 minutos, el personal fue muy amable y atento.En una semana me lo entregaron, excelente!"></Coment>
        <Coment 
          from="Luís Perez"
          date="08/05/2024"
          coment="Asistí a renovar mi DPI, el trámite fue rápido,15 a 20 minutos, el personal fue muy amable y atento.En una semana me lo entregaron, excelente!"></Coment>
      </div>
      
    </div>
  );
} 

export default Comentarios