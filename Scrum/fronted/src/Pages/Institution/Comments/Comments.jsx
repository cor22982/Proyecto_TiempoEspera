import TextArea from "@components/Inputs/TextArea";
import './Comments.css';
import Coment from "@components/Inputs/Coment";
import useApi from '@hooks/api/useApi';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';

const Comentarios = ({ data }) => {
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/comments/${data.id_institutions}`);
  const [coments, setComents] = useState([]);
  const [conver, setConver] = useState(null);
  const [contenido, setContenido] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const coment = await llamadowithoutbody('GET');
      setConver(data.id_conversation);
      setComents(coment);
    };

    fetchData();
  }, [llamadowithoutbody]);

  const postComent = async () => {
    const body = {
      token: localStorage.getItem('access_token'),
      content: contenido,
      conversation_id: conver,
      rating: rating // Incluyendo la calificación en el cuerpo
    };
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await fetch('https://deimoss.web05.lol/comment', fetchOptions);
    console.log("Comentario enviado");
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // Actualiza la calificación al hacer clic en una estrella
  };

  const calcularEstrellas = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <FontAwesomeIcon
            key={`full-${i}`}
            className='icon-star'
            icon={faStar}
            onClick={() => handleStarClick(i)}
          />
        );
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <FontAwesomeIcon
            key={'half'}
            className='icon-star'
            icon={faStarHalfAlt}
            onClick={() => handleStarClick(i)}
          />
        );
      } else {
        stars.push(
          <i
            key={`empty-${i}`}
            className="far fa-star icon-star"
            onClick={() => handleStarClick(i)}
          ></i>
        );
      }
    }

    return stars;
  };

  return (
    <div className="comentarios-container-institution">
      <div className="rating">
        {calcularEstrellas()}
      </div>
      <TextArea 
        placeholder="Agregar Comentario"
        value={contenido}
        onChange={(value) => setContenido(value)} 
        onclick={postComent}
        className="Comentario-Institution"
      />
      <br />
      <div className="coments">
        {
          coments.map((com, index) => (
            <Coment 
              key={index}
              from={com.name}
              date={com.date.substring(0, com.date.indexOf("T"))}
              coment={com.content}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Comentarios;