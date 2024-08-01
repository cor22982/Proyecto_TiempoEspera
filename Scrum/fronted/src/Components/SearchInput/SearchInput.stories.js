import SearchInput from "./SearchInput"
import {faSearch} from '@fortawesome/free-solid-svg-icons';
export default {
  component: SearchInput
}
 
export const SearchInputDefault = {
  args: {
    icono: faSearch, 
    placeholder: 'Input placeholder'
  }
}