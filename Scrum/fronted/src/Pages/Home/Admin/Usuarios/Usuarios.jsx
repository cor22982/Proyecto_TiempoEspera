import { useState, useEffect } from "react";
import useApi from '@hooks/api/useApi';
import useToken from '@hooks/auth/useToken'
import PopUpDelete_User from "@components/Modals/PopUpDelete_User/PopUpDelete_User";
import DeletuserCard from "@components/Cards/DeletuserCard/DeletuserCard";
import './Usuarios.css'
const Usuarios = () => {
  const { token } = useToken();
  const { llamado } = useApi(`https://deimoss.web05.lol/users_info`);
  const [users, setUsers] = useState([]);
  const [dpi, setDPI] = useState('')
  const [showdelete, setDelete] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      const body = {token:token}
      const response = await llamado(body,'POST');
      setUsers(response)
    };
    getUsers();
  }, [llamado, token]);

  const DeleteUser = async ({pi}) => {
    setDelete(true);
    setDPI(pi)
  }
  return (
    <div className="usuarios-screen">
      {users.map((user, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>
          <DeletuserCard
            name_user={user.name}
            dpi_user={user.pi}
            type_user={user.type_user}
            imagen_src={'data:image/png;base64,'+user.imagen_perfil}
            onDelete={() => DeleteUser(user.pi)}
          ></DeletuserCard>
        </div>
      ))}
      <PopUpDelete_User
        activar={showdelete}
        setActivar={setDelete}
        ></PopUpDelete_User>
    </div>
  )
}

export default Usuarios