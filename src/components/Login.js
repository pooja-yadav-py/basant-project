import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [wait,setWait] = useState("Login");

  
  

  const loginUser = async () =>{
    if(!email && !password){
      
      setShowError(true);
      return;
    }
     setWait("processing...")
      const response = await fetch("http://localhost:3001/login", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        email: email,
        password: password,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await response.json();
    
    if (response.status === 400 || !data) {
      setServerResponse("Invalid Credentials");
    } else {
      setServerResponse("Login Successfully");    
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.result.username,
        selectedFile:data.result.selectedFile       
      })
      
    );
    setWait("login");
    navigate('/Home');
    }
    
    setEmail("");
      setPassword("");
    setShowError(false);
       
  }
  
  
  return (
    <>
      <div className="container login-container">

        <div className="inner-container ">
        {serverResponse.length ? <span className="text-danger row justify-content-md-center">⚠️{serverResponse}</span> : ""}

        {showError ? <span className="text-danger">⚠️ Email or password can not be blank</span>:""}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inner-container">          
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-around">
          <div className="mt-1">
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="login-btn">
            <button
              type="submit"
              onClick={() => {
                loginUser();
              }}
            >
              {wait}
            </button>
          </div> 
        </div>   
          <br></br>
          <div className="d-flex justify-content-end pe-3"><Link to="/forget">Forget Password</Link></div>
          
         
      </div>
    </>
  );
};
export default Login;
