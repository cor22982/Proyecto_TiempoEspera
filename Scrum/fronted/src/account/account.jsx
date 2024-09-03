import { useEffect, useState } from 'react';
import useToken from '@hooks/useToken';
import useApi from '@hooks/useApi';
import { parseJwt } from '@hooks/useToken';
import './account.css';

const Account = () => {
    const { token } = useToken();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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
                    console.log("Datos del usuario obtenidos:", data[0]);
                } else {
                    setError('No user data found');
                }
            } catch (apiError) {
                setError(apiError.toString());
            }
        };
        fetchData();
    }, [dpi, llamadowithoutbody]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
        
        if (file && validTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setPreviewImage(reader.result); // Previsualiza la imagen seleccionada
            };
            reader.readAsDataURL(file);
        } else {
            setError('Por favor, selecciona una imagen en formato PNG o JPG.');
        }
    };

    const updateProfileImage = async () => {
        if (!dpi || !userData?.pi || !image) {
            setError('Faltan datos para actualizar la imagen de perfil');
            return;
        }

        try {
            const response = await fetch('https://deimoss.web05.lol/user_Update_Image/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dpi,
                    pi: userData.pi,
                    imagen: image.split(',')[1], // Quitamos el "data:image/jpeg;base64," o similar
                }),
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (response.ok) {
                setUserData((prevData) => ({
                    ...prevData,
                    imagen_perfil: image, // Actualizamos la imagen en el estado
                }));
                setError(null); // Limpiamos cualquier error previo
            } else {
                setError(`Error al actualizar la imagen de perfil: ${responseData.message || 'Error desconocido'}`);
            }
        } catch (apiError) {
            setError(apiError.toString());
        }
    };

    return (
        <div className="account-container">
            <div className="profile-image">
                <img src={previewImage || `data:image/png;base64,${userData?.imagen_perfil || ''}`} alt="Profile" />
            </div>
            <h1 className="account-title">{userData ? `${userData.name} ${userData.lastname}` : 'Perfil del Usuario'}</h1>
            {error && <p className="error">{error}</p>}
            {userData ? (
                <div className="user-info">
                    <p><strong>DPI:</strong> {dpi}</p>
                    <p><strong>ID del Usuario:</strong> {userData.pi}</p>
                    <p><strong>Email:</strong> {userData.email || "-No hay email-"}</p>
                    <p><strong>Nombre Completo:</strong> {`${userData.name} ${userData.lastname}`}</p>
                    <p><strong>Rol:</strong> {userData.type_user}</p>
                    <p><strong>Edad:</strong> {userData.age}</p>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <div className="image-upload">
                <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                <button onClick={updateProfileImage}>Actualizar Imagen de Perfil</button>
            </div>
        </div>
    );
};

export default Account;
