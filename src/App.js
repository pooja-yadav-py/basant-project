import React ,{Fragment} from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const rememberMe = JSON.parse(localStorage.getItem("user"));

  return (
    <>
    <Router>
      <Header/>
      <Routes>
          {!rememberMe ? <Route path="/" element={ <Login/> }/>:<Route path="/" element={ <Home/> }/>}
          <Route path="/home" element={ <Home/> }/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/signup" element={ <Signup/> }/>                  
      </Routes>      
    </Router>
   </>
  );
};
export default App;
