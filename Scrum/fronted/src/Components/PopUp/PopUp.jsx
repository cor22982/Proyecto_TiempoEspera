import './PopUp.css'
const PopUp = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
      <div className="popup-inner">
        <button className="closed-button" onClick={()=>props.setTrigger(false)}>X</button>
        {props.children}
      </div>
    </div>
  ): "";
}

export default PopUp