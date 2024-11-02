import React, { useState, useEffect } from 'react'
import IconButton from '@components/Buttons/IconButton/IconButton';
import {faPlus, faBuilding} from "@fortawesome/free-solid-svg-icons";
import PopInsertColab from '@components/Modals/PopInsertColab/PopInsertColab';
import useApi from '@hooks/api/useApi';
import { parseJwt } from "@hooks/auth/useToken";
import useToken from "@hooks/auth/useToken";
import { CircularProgress } from "@mui/material";
import Users_List from '@components/Cards/Users_List/Users_List';
function Colaboradores() {
  const { token } = useToken();
  const dpi = parseJwt(token).dpi;
  const [showColab , seShowColab] = useState(false)
  const [loading, setLoading] = useState(true); 
  const [info, setInfo] = useState([])
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/relations/${dpi}`);
  useEffect(() => {
    const getUsers = async () => {
      const response = await llamadowithoutbody('GET');
      setInfo(response);
      setLoading(false);
    };
    getUsers();
  }, [llamadowithoutbody]);
  const onIcon = () => {
    seShowColab(true)
  }
  return (
    <div className="usuarios-screen">
      <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{display: 'flex', justifyContent:'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <h1 className='titulo-info'>Colaboradores</h1>
            <div style={{paddingRight: '4rem'}}>
              <IconButton icono={faPlus}   onclick={onIcon}/>
            </div>
            </div>
            {loading ? (
            <CircularProgress /> // Show spinner while loading users
          ) : (
            info.map((user, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <Users_List
                  name_user={user.name}
                  dpi_user={user.pi}
                  imagen_src={'data:image/png;base64,' + user.imagen_perfil}
                />
              </div>
            ))
          )}
      </div>
      
      <PopInsertColab activar = {showColab} setActivar={seShowColab}></PopInsertColab>
    </div>
  )
} 

export default Colaboradores