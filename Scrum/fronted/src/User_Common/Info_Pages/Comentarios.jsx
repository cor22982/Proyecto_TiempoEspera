import TextArea from "@components/TextArea";
import './Comentarios.css'
import Coment from "@components/Coment";
import useApi from '@hooks/useApi';
import { useEffect,useState } from 'react';

const Comentarios = ({data}) => {
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/comments/${data.id_institutions}`);   
  const [coments , setComents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const coment = await llamadowithoutbody('GET');
      setComents(coment)
    };

    fetchData();
  }, [llamadowithoutbody]);
  return (
    <div>
      <TextArea placeholder="Agregar Comentario"></TextArea>
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