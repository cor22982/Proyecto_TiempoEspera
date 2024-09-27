import './Coment.css'
const Coment = ({from, date, coment}) => {
  return (
  <div className='comentario'>
    <div className='header-coment'>
      <h5 className='head-coment'>{from}</h5>
      <p className='date-coment'>{date}</p>
    </div>
    <p className='coment-content'>{coment}</p>
  </div>
  )
  
} 

export default Coment