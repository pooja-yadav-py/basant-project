import React ,{useEffect} from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Forget from "./components/Forget";
import Newpassword from "./components/Newpassword";


import {BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom";
const App = () => {
  

  return (
    <>
    <Router>
      <Header/>

     
      <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/home" element={ <Home/> }/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/signup" element={ <Signup/> }/>   
          <Route path="/forget" element={ <Forget/>}/> 
          <Route path="/newpassword" element={ <Newpassword/>}/>                  
      </Routes>      
    </Router>
   </>
  );
};
export default App;
