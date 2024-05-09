import InsttutionComponent from "../Components/InsttutionComponent"
import './Principal.css'
const Principal = ({ira, datos, setid}) => {
  const onclick = (id) => {
    ira(false)
    setid(id)
  } 

  return (
    <div className="componentes-1">
      {
        datos.map((dato, index) => (
          <InsttutionComponent
          key={index}
          name={dato.name}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZadqAgnFLnzDl0RncSwvEo3z8wKa3Thvsn0tZISkCtQ&s"
          onClick={() => onclick(dato.id_institutions)}
          tiempo="0:00"
        />
        ))
      }
    </div>

  )
}

export default Principal