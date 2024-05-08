import Tramite from './tramite'
import image from '../assets/calle.jpg'

export default {
  component: Tramite
}

export const TramiteDefault = {
  args: {
    institucion: {
        nombre: 'RENAP ZONA 1',
        t_promedio: '1:00:00',
        telefono: '24161900',
        direccion: '9A Calle 0-05',
        horario: 'Lunes a Viernes 7:00 am a 8:00 pm',
        puntuacion: 4.5,
        img: image,
        total: 100,
        lunes: 100,
        martes: 50,
        miercoles: 90,
        jueves: 90,
        viernes: 100,
        sábado: 20,
        domingo: 100
    }
  }
}