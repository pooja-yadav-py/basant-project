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
  const [serverResponse, setServerResponse] = useState("");
  const [wait, setWait] = useState("Submit");
  const navigate = useNavigate();  

  const forgetPassword = async () => {
      console.log(selectedDate)
    if (!email || !selectedDate) {
      setShowError(true);
      return;
    }else{
      let formatedDate = moment(selectedDate).format("MM-DD-YYYY");

      setShowError(false);
      setWait("Processing...")
       const response = await fetch(`http://localhost:3001/forgetpassword`, {
        // Adding method type
        method: "POST",
        
       // Adding body or contents to send
       body:JSON.stringify({
        email:email,
        DOB:formatedDate
       }),

       // Adding headers to the request
       headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      });
      let data = await response.json();
      
      if(response.status === 422){
      setServerResponse(data.error);
      setWait("Submit")
      }else if(response.status === 400){
        setServerResponse(data.error);
        setWait("Submit")
      }
      else{
        setServerResponse(data.message);
      }
      if(data.message==="valid 1"){
        navigate("/newpassword", {state:{id:data._id}});
        
      }
      
      
        
    }
   
  };

  return (
    <div className="forget-outer-container">
      {showError ? (
        <span className="text-danger">⚠️ Email or DOB can not be blank</span>
      ) : (
        ""
      )}
      { serverResponse.length ? (
        <span className="text-danger">⚠️{serverResponse}</span>
      ):""}

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
            {wait}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forget;
