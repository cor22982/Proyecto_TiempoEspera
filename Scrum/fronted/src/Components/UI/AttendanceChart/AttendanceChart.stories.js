import Stats from './AttendanceChart'

export default {
  component: Stats
}

export const StatsDefault = {
  args: {
    datos: {
      Lunes: 100,
      Martes: 50,
      Miércoles: 90,
      Jueves: 90,
      Viernes: 100,
      Sábado: 20,
      Domingo: 100,
    }
  }
}
