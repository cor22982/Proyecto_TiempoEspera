import React from 'react'
import Spinner from "@components/UI/Spinner/Spinner";
import { useState, useEffect } from "react";
import useApi from '@hooks/api/useApi';
import IconButton from '@components/Buttons/IconButton/IconButton';
import {faPlus, faBuilding} from "@fortawesome/free-solid-svg-icons";
import ProcedureCard from '@components/Cards/ProcedureCard/ProcedureCard';
import PopDeletTramite from '@components/Modals/PopDeletTramite/PopDeletTramite';
import PopUpInsertTramite from '@components/Modals/PopUpInsertTramite/PopUpInsertTramite';
function Tramite() {
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/all_procedures`);
  const [loading, setLoading] = useState(true);
  const [tramites, setTramites] = useState([])
  const [id_t, setIdt] = useState(0)
  const [showTramites, setTramitesShow] = useState(false)
  const [show_inser, setShowInsert] = useState(false)
  useEffect(() => {
    const getTramites = async () => {
      const response = await llamadowithoutbody('GET');
      setTramites(response)
      setLoading(false);
    };
    getTramites();
  }, [llamadowithoutbody]);

  const  ShowProcedure = async (id) => {  
    try {
      const response = await fetch(`https://deimoss.web05.lol/procedure/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setTramitesShow(true)
        setIdt(id)
      } else {
        console.error(`Error eliminando el tramite ${response}`);
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
   
  }
  return (
    <div className="lista_screen">
      {loading ? ( // Muestra el spinner si está cargando
        <Spinner/>
      ) : (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className='titulo-info'>Tramites</h1>
            <div style={{paddingRight: '4rem'}}>
              <IconButton icono={faPlus}  onclick={()=>{setShowInsert(true)}} />
            </div>
            
          </div>

          <div className="list-institutions">{
          tramites.map((trm, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <ProcedureCard
                procedure={trm.name}
              
                onDelete={() => ShowProcedure(trm.id)}
              />
            </div>
        ))}</div>
          
        </div>
      )}
    
    <PopDeletTramite
      activar={showTramites} setActivar={setTramitesShow} id={id_t}></PopDeletTramite>

    <PopUpInsertTramite activar={show_inser} setActivar={setShowInsert}></PopUpInsertTramite>
    </div>
  )
}

export default Tramite