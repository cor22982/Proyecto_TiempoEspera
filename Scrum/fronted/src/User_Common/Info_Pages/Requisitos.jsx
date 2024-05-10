import useApi from '@hooks/useApi';
import Checkbox from "../../Components/Checkbox"  
import { useEffect,useState } from 'react';
const Requisitos = ({data}) => {
  const { id_procedure } = data
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/requirements/${id_procedure}`);
  const [requeriments , setRequeriments] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const requisitos = await llamadowithoutbody('GET');
      setRequeriments(requisitos)
    };

    fetchData();
  }, [llamadowithoutbody]);

  return (
    <div>
      <h4>Requisitos</h4>
      {
        requeriments.map( (req, index) => (
          <Checkbox 
            key={index}
            name={req.name +" ( "+ req.description+" )"}/>
        ))
      }
      
    </div>
  ) 
}

export default Requisitos