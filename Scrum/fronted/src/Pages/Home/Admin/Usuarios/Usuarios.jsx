import { useState, useEffect } from "react";
import useApi from '@hooks/api/useApi';
import useToken from '@hooks/auth/useToken';
import PopUpDelete_User from "@components/Modals/PopUpDelete_User/PopUpDelete_User";
import DeletuserCard from "@components/Cards/DeletuserCard/DeletuserCard";
import './Usuarios.css';
import { CircularProgress } from "@mui/material";

const Usuarios = () => {  
  const { token } = useToken();
  const { llamado } = useApi(`https://deimoss.web05.lol/users_info`);
  const [users, setUsers] = useState([]);
  const [dpi, setDPI] = useState('');
  const [showdelete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [deleting, setDeleting] = useState(false); // State for delete loading

  useEffect(() => {
    const getUsers = async () => {
      const body = { token: token };
      const response = await llamado(body, 'POST');
      setUsers(response);
      setLoading(false);
    };
    getUsers();
  }, [llamado, token]);

  const DeleteUser = async (pi) => {  
    setDeleting(true); // Start loading for delete
    try {
      const response = await fetch(`https://deimoss.web05.lol/user/${pi}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setUsers(users.filter(user => user.pi !== pi)); // Remove deleted user from state
        setDelete(true);
        console.log(`Usuario con DPI ${pi} eliminado correctamente`);
      } else {
        console.error(`Error eliminando el usuario con DPI ${pi}`);
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    } finally {
      setDeleting(false); // End loading for delete
    }
  };

  return (
    <div className="usuarios-screen">
      <div className="titule">Usuarios</div>
      {loading ? (
        <CircularProgress /> // Show spinner while loading users
      ) : (
        <div className="list-institutions">
          {users.map((user, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <DeletuserCard
                name_user={user.name}
                dpi_user={user.pi}
                type_user={user.type_user}
                imagen_src={'data:image/png;base64,' + user.imagen_perfil}
                onDelete={() => DeleteUser(user.pi)}
              />
            </div>
          ))}
        </div>
      )}
      {deleting && <CircularProgress />} {/* Show spinner while deleting */}
      <PopUpDelete_User
        activar={showdelete}
        setActivar={setDelete}
      />
    </div>
  );
};

export default Usuarios;
