import { useEffect, useState } from 'react';
import useToken from '@hooks/useToken';
import useApi from '@hooks/useApi';
import { parseJwt } from '@hooks/useToken';
import './account.css'; // Asume que los estilos están definidos en este archivo CSS

const Account = () => {
    const { token } = useToken();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    
    let dpi;
    if (token) {
      const decodedToken = parseJwt(token);
      dpi = decodedToken.dpi;
    }
    
    const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/userInfo/${dpi}`);

    useEffect(() => {
        const fetchData = async () => {
            if (!dpi) {
                setError('No DPI found in token');
                return;
            }
            try {
                const data = await llamadowithoutbody('GET');
                if (data && data.length > 0) {
                    setUserData(data[0]);
                } else {
                    setError('No user data found');
                }
            } catch (apiError) {
                setError(apiError.toString());
            }
        };
        fetchData();
    }, [dpi, llamadowithoutbody]);

    return (
      <div className="account-container">
        <div className="profile-image">
          <img src={userData?.imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile" />
        </div>
        <h1 className="account-title">{`${userData.name} ${userData.lastname}`}</h1>
        {error && <p className="error">{error}</p>}
        {userData ? (
          <div className="user-info">
            <p><strong>DPI:</strong> {dpi}</p>
            <p><strong>ID del Usuario:</strong> {userData.pi}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Nombre Completo:</strong> {`${userData.name} ${userData.lastname}`}</p>
            <p><strong>Rol:</strong> {userData.type_user}</p>
            <p><strong>Edad:</strong> {userData.age}</p>
          </div>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    );
}

export default Account;
