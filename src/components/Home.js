import React from 'react';
import {useNavigate} from 'react-router-dom';


import './Home.css';


const Home = () => {
       const rememberMe = JSON.parse(localStorage.getItem("user"));
       const navigate = useNavigate();
       if (!rememberMe) {
         navigate("/login");
       }
    
    return (
        <>
           <div className="home-container">
              <h1>welcome</h1>
           </div>    
        </>
    )
}

export default Home;
