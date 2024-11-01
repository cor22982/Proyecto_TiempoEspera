import React, { useState } from 'react'
import IconButton from '@components/Buttons/IconButton/IconButton';
import {faPlus, faBuilding} from "@fortawesome/free-solid-svg-icons";
import PopInsertColab from '@components/Modals/PopInsertColab/PopInsertColab';

function Colaboradores() {
  const [showColab , seShowColab] = useState(false)

  const onIcon = () => {
    seShowColab(true)
  }
  return (
    <div className="usuarios-screen">
      <div style={{ padding: '4rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className='titulo-info'>Colaboradores</h1>
            <div style={{paddingRight: '4rem'}}>
              <IconButton icono={faPlus}   onclick={onIcon}/>
            </div>
      </div>
      <PopInsertColab activar = {showColab} setActivar={seShowColab}></PopInsertColab>
    </div>
  )
} 

export default Colaboradores