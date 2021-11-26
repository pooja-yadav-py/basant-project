import React, {useState,useRef} from "react";
import {useNavigate, Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import "./Signup.css";

const Signup = () => {
    const ref = useRef();
     
    const navigate = useNavigate();
    const [gender, setGender] = useState("");
    const initialUserState ={
        username: "",
        gender:"",
        date:"",
        email:"",
        password:"",
        confirmPassword:"",
        selectedFiles:""
    }
    const [user, setUser] = useState(initialUserState);
    const [showError, setShowError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [serverResponse, setServerResponse] = useState("");
    const [wait,setWait] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    
    
    // console.log(moment(new Date(selectedDate)).format('DD-MM-YYYY'));
    
    const handleGenderInput = (e) =>{    

     setGender(e.target.name);
     setUser({ ...user, gender:e.target.name });
     setShowError(false);        
    }

   
     
    

    const handleInputs = (e) =>{
     setUser({ ...user, [e.target.name]:e.target.value })
     setShowError(false);
     setPasswordError(false);
    }


    const handleInputFile = async (e) =>{
        const name = e.target.name;
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        
        setUser({ ...user, [name]:base64 });
        setShowError(false);

    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      
      
  const signUpUser = async () => {
    let formatedDate = moment(selectedDate).format("MM-DD-YYYY");
    // console.log(formatedDate)
      if(user.username && user.gender && selectedDate && user.email && user.password && user.confirmPassword && user.selectedFiles )
      { 
          if(user.password===user.confirmPassword)
          {
            setShowError(false);
            setPasswordError(false);

            const response = await fetch(`http://localhost:3001/signup`, {
              // Adding method type
              method: "POST",
        
              // Adding body or contents to send
              body: JSON.stringify({
                username:user.username,
                gender:user.gender,
                date:formatedDate,
                email:user.email,
                password:user.password,
                confirmPassword:user.confirmPassword,
                selectedFile:user.selectedFiles
              }),
        
              // Adding headers to the request
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            let data = await response.json();
            if(response.status===422){
              setServerResponse(data.error);
              setWait(response.status);
              console.log(response.status)
              
            }
            else{
              setServerResponse(data.message);
              console.log(response.status)
              setWait(response.status)
              ref.current.value = "";
              setGender("");        
              setUser(initialUserState);
              navigate('/Login');
            }
            
          }else{
            setPasswordError(true);
          }
        
      }else{
          setShowError(true);
      }
     
  };
  return (
    <>        <div className="signup-container">
            {serverResponse.length ? <span className="text-danger">⚠️{serverResponse}</span> : ""}
            {showError ? <span className="text-danger mb-1" >⚠️ please fill the all field properly.</span>:""}
            {passwordError ? <span className="text-danger mb-1">⚠️ please confirm password check.</span>:""}

                <input className="mt-0"type="text" id="fname" name="username" placeholder="Enter your name" value={user.username} onChange={handleInputs}/><br></br>       
                <div className="mb-3">
                <input checked={gender==='male'} type="radio" id="male" name="male" value={gender} onChange={handleGenderInput} />&nbsp;
                <label className="gender me-3" for="male">Male</label>
                <input checked={gender==='female'} type="radio" id="female" name="female" value={gender} onChange={handleGenderInput}/>&nbsp;
                <label className="gender me-3" for="female">Female</label>
                <input checked={gender==='other'} type="radio" id="other" name="other" value={gender} onChange={handleGenderInput}/>&nbsp;
                <label className="gender me-3" for="other">Other</label><br></br>
                </div>
                <div className="date-of-birth d-flex">
                 <label for="birthday">DOB:</label>
                 <DatePicker 
                     className="birthday pt-1"
                     selected={selectedDate} 
                     onChange={(date) => setSelectedDate(date)} 
                     showMonthDropdown
                      showYearDropdown
                      scrollableMonthYearDropdown  
                     />
                </div>
                <input type="email" id="email" name="email" placeholder="Enter your email" value={user.email} onChange={handleInputs}/><br></br>
                <input type="password" id="pwd" name="password" placeholder="Enter your password" value={user.password} onChange={handleInputs}/><br></br>
                <input type="password" id="pwd" name="confirmPassword" placeholder="Enter confirm password" value={user.confirmPassword} onChange={handleInputs}/><br></br>
                <label  for="files">Select files:</label>
                <input type="file" id="files" name="selectedFiles" multiple onChange={handleInputFile}  ref={ref}/><br></br>
                <div className=" sign_up_bottom d-flex justify-content-between  pe-3 ">
                 <div><Link to="/login">Login</Link></div> 
                  <div><button                 
                      type="submit"
                      onClick={() => {
                      signUpUser();
                      }}
                  >
                  Signup                     
                  </button>
                  </div>
                </div>
                
          </div>
    </>
  );
};
export default Signup;
