import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {useNavigate} from 'react-router-dom';

import './Forget.css';

const Forget = () => {
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  let formatedDate = moment(selectedDate).format("MM-DD-YYYY");
  console.log(formatedDate);
  

  const forgetPassword = async () => {
      console.log(selectedDate)
    if (!email || !selectedDate) {
      setShowError(true);
      return;
    }else{
      setShowError(false);
       const response = await fetch(`http://localhost:3001/forgetpassword`, {
        // Adding method type
        method: "POST",
        
       // Adding body or contents to send
       body:JSON.stringify({
        email:email,
        selectedDate:selectedDate
       }),

       // Adding headers to the request
       headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      });
      let data = await response.json();
      
        navigate('/newpassword');
    }
   
  };

  return (
    <div className="forget-outer-container">
      {showError ? (
        <span className="text-danger">⚠️ Email or DOB can not be blank</span>
      ) : (
        ""
      )}
      <div className="forget-inner-container">
      <div className="forget-details">
        <label  for="email">Email:</label>
        <input  
          className="pt-1"       
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="forget-details d-flex">
          <label for="birthday">DOB:&nbsp;</label>
          <DatePicker
        
            placeholderText="MM/DD/YYYY"
            className="birthday pt-1"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthDropdown
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div className="forget-submit-details-btn">
          <button
            type="submit"
            onClick={() => {
              forgetPassword();
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
