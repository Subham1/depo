import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List";
import Detail from "./components/Detail";
import Navbar from "./components/Navbar";
import ImageUpload from "./components/Image";
const App = () => {
  return (
    <>
    <Navbar/>
    
  
    <Router>
      <Routes>
        <Route path="/" element={<List />} />  
        <Route path="/restaurant/:id" element={<Detail />} /> 
      </Routes>
    </Router>
  
    </>
  );
};

export default App;
