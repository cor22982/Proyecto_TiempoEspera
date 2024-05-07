import InsttutionComponent from "../Components/InsttutionComponent"
import './Principal.css'
const Principal = ({ira, datos}) => {
  const onclick = () => {
    ira(false)
  } 

  return (
    <div className="componentes-1">
      {
        datos.map((dato, index) => (
          <InsttutionComponent
          key={index}
          name={dato.name}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZadqAgnFLnzDl0RncSwvEo3z8wKa3Thvsn0tZISkCtQ&s"
          onClick={onclick}
          tiempo="0:00"
        />
        ))
      }
    </div>

  )
}

export default Principal