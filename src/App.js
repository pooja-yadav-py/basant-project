import React ,{Fragment} from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
          <Route path="/login" element={ <Login/>}/>
          <Route path="/signup" element={<Signup />}/>                  
      </Routes>      
    </Router>
   </>
  );
};
export default App;
