import React,{useState} from "react";
import { Link,NavLink,useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


import './Header.css';


const Header = () => {
  const navigate = useNavigate();
  const rememberMe = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const logOut = () => {
    localStorage.removeItem("user");    
      navigate('/login');
      setShow(false);    
  };
  
  return (
    
    <>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">USER MANAGMENT</span>          
          <div className="navbar-right-menu d-flex">
          {/* {rememberMe?:null}
          {rememberMe?<div className="userName text-light">{rememberMe.name}</div>:null} */}
        </div> 
        { !rememberMe ? (    
        <div className="navbar-log-sign d-flex"> 
          <NavLink to="/login" activeClassName="active-link">Login</NavLink>
          <NavLink to="/signup" activeClassName="active-link">Signup</NavLink>
        </div>):
        (<div className="d-flex login-user-info">
          <div className="userimg text-light pe-2"><img src={rememberMe.selectedFile}/></div>
          <div className="userName text-light pe-2">{rememberMe.name}</div>
          <div className="pe-2" role="button" onClick={()=>setShow(!show)}><ArrowDropDownIcon/></div>
          {show?<Link className="logout-btn text-light" to="/login" role="button" onClick={()=>{logOut()}}>LogOut</Link>:null}

        </div>)
        }

        
        
          {/* <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" 
            type="button" 
            id="dropdownMenuButton1" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            onClick={()=>setShow(!show)}
            >
            </button>     */}
            {/* {show ? !rememberMe ? <ul className="dropdon-menu  p-2 mt-1 rounded">
                <li><Link to="/login" onClick={()=>setShow(!show)}>Login</Link></li>
                <li><Link to="/signup" onClick={()=>setShow(!show)}>SignUp</Link></li>
            </ul>:<ul className="dropdon-menu  p-2 mt-1 rounded">
                <li><Link to="/login" onClick={()=>{logOut()}}>LogOut</Link></li>
            </ul>:null} */}
          {/* </div> */}
        </div>
        
      </nav>

    </>
  );
};

export default Header;
