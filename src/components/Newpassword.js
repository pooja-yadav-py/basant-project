import React, { useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import './Newpassword.css';

const Forget = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [wait, setWait] = useState("Submit");

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state.id);

  const changePassword = async () => {
    if (!password || !confirmPassword) {
      setShowError(true);
      return;
    }else if(password != confirmPassword){
      setPassError(true);
      return;
    }    
    else{
      setWait("Processing...")
    const response = await fetch(`http://localhost:3001/changePassword/${location.state.id}`,{
        // Adding method type
        method: "PATCH",

         // Adding body or contents to send
         body: JSON.stringify({
          password:password
        }),

         // Adding headers to the request
         headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
    });
    setWait("submit")
       navigate('/home');
    }
    
  };

  console.log(confirmPassword)
  console.log(password)

  return (
    <div className="forget-outer-container">
      {showError ? (
        <span className="text-danger">⚠️ Password or confirmPassword can not be blank</span>
      ) : (
        ""
      )}
      {passError ? (       
           <span className="text-danger">⚠️ Please check your confirm password</span>
      ) : (
        ""
      )}
      <div className="forget-inner-container">
      <div className="forget-details">
        <label  for="password">Password:</label>
        <input type="password" id="pwd" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/><br></br>
        <label  for="password">Confirm Password:</label>
        <input type="password" id="pwd" name="confirmPassword" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/><br></br>
        </div>
        
        <div className="forget-submit-details-btn">
          <button
            type="submit"
            onClick={() => {
              changePassword();
            }}
          >
            {wait}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forget;
