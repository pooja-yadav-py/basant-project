import React,{useState} from "react";
import { Link } from 'react-router-dom';

import './Header.css';


const Header = () => {
    const [show, setShow] = useState(false);
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">USER MANAGMENT</span>
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" 
            type="button" 
            id="dropdownMenuButton1" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            onClick={()=>setShow(!show)}>
            </button>
            
            {show?
            <ul className="dropdon-menu  p-2 mt-1 rounded">
                <li><Link to="/login" onClick={()=>setShow(!show)}>Login</Link></li>
                <li><Link to="/signup" onClick={()=>setShow(!show)}>SignUp</Link></li>
            </ul>:null}
          </div>
        </div>
        
      </nav>

    </>
  );
};

export default Header;
