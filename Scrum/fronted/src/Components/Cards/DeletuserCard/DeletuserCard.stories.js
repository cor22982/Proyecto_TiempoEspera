import DeletuserCard from "./DeletuserCard"
 
export default {
    component: DeletuserCard
}

export const DeletuserCardDefault = {
    args: {
        name_user: 'Nombre usuario',
        dpi_user: '3620515420101',
        type_user: 'comun',
        imagen_src: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg',
        onDelete:  () => alert('Hello'),
    }
}