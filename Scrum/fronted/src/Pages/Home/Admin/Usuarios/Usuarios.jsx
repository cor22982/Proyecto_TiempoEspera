import { useState, useEffect } from "react";
import useApi from '@hooks/api/useApi';
import useToken from '@hooks/auth/useToken'
import PopUpDelete_User from "@components/Modals/PopUpDelete_User/PopUpDelete_User";
import DeletuserCard from "@components/Cards/DeletuserCard/DeletuserCard";
import './Usuarios.css'
import Spinner from "../../../../Components/UI/Spinner/Spinner";
const Usuarios = () => {  
  const { token } = useToken();
  const { llamado } = useApi(`https://deimoss.web05.lol/users_info`);
  const [users, setUsers] = useState([]);
  const [dpi, setDPI] = useState('')
  const [showdelete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const getUsers = async () => {
      const body = {token:token}
      const response = await llamado(body,'POST');
      setUsers(response)
      setLoading(false);
    };
    getUsers();
  }, [llamado, token]);

  const DeleteUser = async (pi) => {  
    try {
      const response = await fetch(`https://deimoss.web05.lol/user/${pi}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setDelete(true);
        console.log(`Usuario con DPI ${pi} eliminado correctamente`);
      } else {
        console.error(`Error eliminando el usuario con DPI ${pi}`);
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  }
  return (
    <div className="usuarios-screen">
      <h1 className='titulo-info'>Usuarios</h1>
    {loading ? ( // Muestra el spinner si está cargando
        <Spinner/>
      ) : (
        
        users.map((user, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            <DeletuserCard
              name_user={user.name}
              dpi_user={user.pi}
              type_user={user.type_user}
              imagen_src={'data:image/png;base64,' + user.imagen_perfil}
              onDelete={() => DeleteUser(user.pi)}
            />
          </div>
        ))
      )}
      <PopUpDelete_User
        activar={showdelete}
        setActivar={setDelete}
        ></PopUpDelete_User>
    </div>
  )
}

export default Usuarios