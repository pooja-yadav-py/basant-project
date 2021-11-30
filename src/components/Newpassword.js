import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './Newpassword.css';

const Forget = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [passError, setPassError] = useState(false);
  const navigate = useNavigate();

  

  const changePassword = () => {
    if (!password || !confirmPassword) {
      setShowError(true);
      if(password !== confirmPassword){
        setPassError(true);
      return;
    }
      return;
    }else{
        navigate('/login');
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forget;
