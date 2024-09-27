import TextArea from "@components/Inputs/TextArea";
import './Comments.css'
import Coment from "@components/Inputs/Coment";
import useApi from '@hooks/api/useApi';
import { useEffect,useState } from 'react';

const Comentarios = ({data}) => {
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/comments/${data.id_institutions}`);   
  const [coments , setComents] = useState([]);
  const [conver, setConver] = useState(null);
  const [ contenido, setContenido] = useState('')
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