import styled from "styled-components";
import { 
  faArrowLeft,
  faUser, faHome, faSave, faGear, faBell, faRightFromBracket, faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export function Sidebar({ sidebarOpen, setSidebarOpen, linksArray, secondarylinksArray, handleMenuClick }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <Container isOpen={sidebarOpen} >
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
      <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </button>
      <div className="Logocontent">
        <div className="imgcontent">
        <img src='../../src/assets/Login/logotipo.png' className='imagen-portada' alt="Logotipo" />
        </div>
      </div>
      {linksArray.map(({ icon, label, to}) => (
        <div className="LinkContainer" key={label} onClick={() => handleMenuClick(to)}>
            <div className="Linkicon">
              <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            </div>
            {sidebarOpen && <span>{label}</span>}
        </div>
      ))}
      <Divider />
      {secondarylinksArray.map(({ icon, label, to}) => (
        <div className="LinkContainer" key={label} onClick={() => handleMenuClick(to)}>
            <div className="Linkicon">
              <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            </div>
            {sidebarOpen && <span>{label}</span>}
         
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  color: white;
  background: #00367E;
  position: sticky;
  padding-top: 20px;
  width: fill ;
  display: flex;
  flex-direction: column;
  align-items: center;
  .Sidebarbutton {
    position: absolute;
    top: 68px;
    right: -18px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    color: white;
    background:  #00367E;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    font-size: 1.25rem;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
     background-position: 0 0; 
    transition: background-color 0.3s;
    :hover {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: inherit;
    }
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top:24px;
    width: 120px;
    height: 50px;
    padding-bottom: 54px;
    .imgcontent {
      display: flex;
      img {
        max-width: 100%;
        height: auto;
      }
      transition: all 0.3s;
      transform: ${({ isOpen }) => (isOpen ? `scale(1)` : `scale(0.5)`)};
    }
    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    }
  }
  .LinkContainer {
    margin: 8px 0;
    width: fill ;
    display: flex;
    gap: 15px;
    font-size: 1.375rem;
    // font-size: inherit;
    padding: 0 15%;
    cursor: pointer;
    height: 40px;
    :hover {
      color: rgba(250, 250, 250, 0.5);
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      
      
      height:50px;
      .Linkicon {
       
        display: flex;

        svg {
          font-size: 25px;
        }
      }
      &.active {
        .Linkicon {
        
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: white;
  
`;
//#endregion

export default Sidebar;