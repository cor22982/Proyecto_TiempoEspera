import React from 'react'
import Spinner from "@components/UI/Spinner/Spinner";
import { useState, useEffect } from "react";
import useApi from '@hooks/api/useApi';
import Institution_List from '@components/Cards/Institution_List/Institution_List';
import IconButton from '@components/Buttons/IconButton/IconButton';
import './Institutions.css'
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import PopUpDelete_User from "@components/Modals/PopUpDelete_User/PopUpDelete_User";
import PopInsert from '@components/Modals/PopInsert/PopInsert';
function Institutions() {
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/institutions`);
  const [inst, setInst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInst, setInst_Show] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      const response = await llamadowithoutbody('GET');
      setInst(response)
      setLoading(false);
    };
    getUsers();
  }, [llamadowithoutbody]);

  const onPlus = async() => {

    setInst_Show(true)
  }
  return (
    <div className="lista_screen">
      {loading ? ( // Muestra el spinner si está cargando
        <Spinner/>
      ) : (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className='titulo-info'>Instituciones</h1>
            <div style={{paddingRight: '4rem'}}>
              <IconButton icono={faPlus} onclick={onPlus}/>
            </div>
            
          </div>
          <div className="lista_show">
            <Institution_List institutions_items={inst}></Institution_List>
          </div>
        </div>
      )}
      <PopInsert
        activar={showInst}
        setActivar={setInst_Show}
        ></PopInsert>
    </div>
  )
}

export default Institutions