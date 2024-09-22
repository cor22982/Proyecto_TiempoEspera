import TextArea from "@components/TextArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Comentarios.css'
import Coment from "@components/Coment";
import useApi from '@hooks/useApi';
import { useEffect,useState } from 'react';
import { faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import useToken from '@hooks/useToken';
const Comentarios = ({data}) => {
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/comments/${data.id_institutions}`);
  const { llamado } = useApi('https://deimoss.web05.lol/rating');
  const [rating, setRating] = useState(0);
  const [coments , setComents] = useState([]);
  const [conver, setConver] = useState(null);
  const [ contenido, setContenido] = useState('')
  const { token } = useToken()

  const handleStarClick = async (index) => {
    setRating(index + 1); // Update the rating based on the clicked star
    console.log(index +1)
    const body = {
        token: token,
        institution: data.id_institutions.id,
        rating: rating
    }
    const {succes} = await llamado(body,'POST')
    
    console.log(succes)
};

  const calcularEstrellas = () => {
      const puntuacionTotal = 5;
      const puntuacionEntera = Math.floor(rating);
      const puntuacionDecimal = rating - puntuacionEntera;

      const estrellasEnteras = Array.from({ length: puntuacionEntera }, (_, index) => (
          <FontAwesomeIcon
              key={`full-${index}`}
              className='icon-star'
              icon={faStar}
              onClick={() => handleStarClick(index)}
          />
      ));

      if (puntuacionDecimal >= 0.5) {
          estrellasEnteras.push(
              <FontAwesomeIcon
                  key={'half'}
                  className='icon-star'
                  icon={faStarHalfAlt}
                  onClick={() => handleStarClick(puntuacionEntera)}
              />
          );
      }

      const estrellasRestantes = Array.from({ length: puntuacionTotal - estrellasEnteras.length }, (_, index) => (
          <i
              key={`empty-${index}`}
              className="far fa-star icon-star"
              onClick={() => handleStarClick(puntuacionEntera + index)}
          ></i>
      ));

      return [...estrellasEnteras, ...estrellasRestantes];
  };


  useEffect(() => {
    const fetchData = async () => {
      const coment = await llamadowithoutbody('GET');
      setConver(data.id_conversation)
      setComents(coment)
    };

    fetchData();
  }, [llamadowithoutbody]);

  const postcoment = async() => {
    const body = { token: localStorage.getItem('access_token') ,content: contenido, conversation_id:conver}
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch('https://deimoss.web05.lol/comment', fetchOptions);
    console.log("postear")
  }
  return (
    <div>
      <h3>Calificar Institucion</h3>
      <div className='puntuacion'>
        {calcularEstrellas()}
      </div>
      <br></br>
      <TextArea 
        placeholder="Agregar Comentario"
        value={contenido}
        onChange={(value)=> setContenido(value)} 
        onclick={postcoment}></TextArea>
      <br></br>
      <div className="coments">
        {
          coments.map( (com, index) => (
            <Coment 
              key={index}
              from={com.name}
              date={com.date.substring(0, com.date.indexOf("T"))}
              coment={com.content}></Coment>
            
          ))
        }
      </div>
      
    </div>
  );
} 

export default Comentarios