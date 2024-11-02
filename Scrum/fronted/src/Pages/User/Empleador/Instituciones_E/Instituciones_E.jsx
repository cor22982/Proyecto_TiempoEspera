import Institutions_List2 from '@components/Cards/Institutions_List2/Institutions_List2'
import { useState, useEffect } from "react";
import useApi from '@hooks/api/useApi';
import { CircularProgress } from "@mui/material";
function Instituciones_E() {
  const [loading, setLoading] = useState(true); 
  const [info, setInfo] = useState([])
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/contactInfo`);
  useEffect(() => {
    const getUsers = async () => {
      const response = await llamadowithoutbody('GET');
      setInfo(response);
      setLoading(false);
    };
    getUsers();
  }, [llamadowithoutbody]);
  return (
    <div className="usuarios-screen">
      <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className='titulo-info'>Instituciones</h1>
            {loading ? (
            <CircularProgress /> // Show spinner while loading users
          ) : (
            <Institutions_List2 institutions_items={info}/>
          )}
            
      </div>
    </div>
  )
}

export default Instituciones_E