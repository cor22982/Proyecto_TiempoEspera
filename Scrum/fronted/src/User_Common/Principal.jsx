import InsttutionComponent from "../Components/InsttutionComponent"
import './Principal.css'
const Principal = ({ira, datos, setobj}) => {
  const onclick = (id_i, id_p, nam_i) => {
    ira(false)
    const objeto_ids = {
      id_institutions: id_i,
      id_procedure: id_p,
      name_institutions: nam_i
    }
    setobj(objeto_ids)
  } 

  return (
    <div className="componentes-1">
      {
        datos.map((dato, index) => (
          <InsttutionComponent
          key={index}
          name={dato.name}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZadqAgnFLnzDl0RncSwvEo3z8wKa3Thvsn0tZISkCtQ&s"
          onClick={() => onclick(dato.id_institutions, dato.id_procedure, dato.name)}
          tiempo="0:00"
        />
        ))
      }
    </div>

  )
}

export default Principal