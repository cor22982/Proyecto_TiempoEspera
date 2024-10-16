import { useEffect, useState } from 'react';
import useToken from '@hooks/auth/useToken';
import useApi from '@hooks/api/useApi';
import { parseJwt } from '@hooks/auth/useToken';
import './account.css';
import Popaccount from '@components/Modals/PopAccount/Popaccount';
import Label_Input from '@components/Inputs/Label_Input/Label_Input';
const Account = () => {
    const { token } = useToken();
    const [userData, setUserData] = useState(null);
    const [activar, setActivar] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [datos, setDatos] = useState({pi: '', data: ''})
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Modo de edición
    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
    const {llamado} = useApi('https://deimoss.web05.lol/user_Update_info')
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
                setValue('pi', dpi)
                
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
        
        if (file && validTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Imagen seleccionada en modo edición
                setUploadSuccess(false); // Resetea el estado de éxito
            };
            reader.readAsDataURL(file);
        } else {
            setError('Por favor, selecciona una imagen en formato PNG o JPG.');
        }
    };

    const setValue = (name, value) => {
        setDatos((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      
    
    const UpdateInfo = async(ty) => {
        const body = {pi:datos.pi, data: datos.data, type: ty}
        try {
            const resultado = await llamado(body, 'PUT');
            // Manejar el resultado aquí, si es necesario
          } catch (error) {
            console.error('Error al actualizar la información:', error);
          }
    }

    const updateProfileImage = async () => {
        if (!dpi || !userData?.pi || !selectedImage) {
            setError('Faltan datos para actualizar la imagen de perfil');
            return;
        }
    
        try {
            const base64Image = selectedImage.split(',')[1]; // Quitamos el encabezado "data:image/jpeg;base64," o similar
            const response = await fetch('https://deimoss.web05.lol/user_Update_Image/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dpi,
                    pi: userData.pi,
                    image: base64Image, // Enviamos la imagen sin el encabezado
                }),
            });
    
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
    
            if (response.ok) {
                setUserData((prevData) => ({
                    ...prevData,
                    imagen_perfil: selectedImage, // Actualizamos la imagen en el estado
                }));
                setImage(selectedImage); // Actualiza la imagen principal
                setUploadSuccess(true); // Muestra el estado de éxito
                setError(null); // Limpiamos cualquier error previo
                setIsEditing(false); // Salimos del modo edición
                console.log('Imagen guardada en la base de datos:', selectedImage);
            } else {
                setError(`Error al actualizar la imagen de perfil: ${responseData.message || 'Error desconocido'}`);
            }
        } catch (apiError) {
            setError(apiError.toString());
            setActivar(true)
        }
    };
    
    const cancelEdit = () => {
        setSelectedImage(null); // Limpiamos la imagen seleccionada
        setIsEditing(false); // Salimos del modo edición
        setError(null); // Limpiamos cualquier error
    };

    
    return (
        <div className="account-container">
            <div className="profile-image-container">
                <img
                    className="profile-image"
                    src={isEditing ? (selectedImage || `data:image/png;base64,${userData?.imagen_perfil}`) : (image || `data:image/png;base64,${userData?.imagen_perfil}`)}
                    alt="Profile"
                />
                {!isEditing && (
                    <i className="fas fa-pencil-alt edit-icon" onClick={() => setIsEditing(true)}></i>
                )}
                <div className="edit-overlay" style={{ opacity: isEditing ? 1 : 0 }}>
                    {isEditing && (
                        <>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fas fa-camera"></i> Cambiar
                            </label>
                            <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                            <div className="edit-actions">
                                <button className="cancel-button" onClick={cancelEdit}>
                                    <i className="fas fa-times"></i>
                                </button>
                                <button className="confirm-button" onClick={updateProfileImage}>
                                    <i className="fas fa-check"></i>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
    
            {/* Contenedor de mensajes */}
            <div className="message-container">
                {error && <p className="error">{error}</p>}
                {uploadSuccess && <p className="success">Imagen actualizada correctamente</p>}
            </div>
    
            <h1 className="account-title">{userData ? `${userData.name} ${userData.lastname}` : 'Perfil del Usuario'}</h1>
            {userData ? (
                <div className="user-info">
    
                    <p><strong>DPI:</strong> {dpi}</p>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <p><strong>Email:</strong></p>
                        <Label_Input 
                            label_name ={userData.email || "-No hay email-"}
                            value = {datos.data}
                            onChange={(value) => setValue('data',value)}
                            to_Send={() => {  UpdateInfo('email');}}></Label_Input>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <p><strong>Telefono:</strong></p>
                        <Label_Input 
                            label_name ={userData.telephone || "-No hay telefono-"}
                            value = {datos.data}
                            on_open ={()=>{setValue('data', '')}}
                            onChange={(value) => setValue('data',value)}
                            to_Send={() => {  UpdateInfo('telephone');}}></Label_Input>
                    </div>
                    <p><strong>Nombre Completo:</strong> {`${userData.name} ${userData.lastname}`}</p>
                    <p><strong>Rol:</strong> {userData.type_user === "usuario_comun" ? "Usuario Común" : userData.type_user }</p>
                    <p><strong>Edad:</strong> {userData.birthdate}</p>
                    
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        <Popaccount activar={activar} setActivar={setActivar} error={error}></Popaccount>
        </div>
    );
    
};

export default Account;
