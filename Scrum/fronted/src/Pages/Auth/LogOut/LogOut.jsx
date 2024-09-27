import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './LogOut.css'
const Logout = () => {
 
  useEffect(() => {
    localStorage.clear()
    setTimeout(() => {
      window.location.href = '/';
    }, 1000)
  }, [])

  return (
    <div className='salir'>
      <FontAwesomeIcon icon={faSpinner} className="icon-logout" />
      <h1 className='titulosaliendo'>Saliendo</h1>
    </div>
  )
} 

export default Logout