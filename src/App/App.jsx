import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Kanban from '../components/Kanban/Kanban';
import './App.scss';
import logo from "../images/img.svg";
import WebFont from "webfontloader";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat:400,700", "Open Sans"],
      },
    });

  }, []);
  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <nav className='nav-bar'>
        <Link to="/" className={`${location.pathname == '/' ? 'selected' : 'default-nav-bar'}`}>Home</Link>  |
        <Link to="/my-component" className={`${location.pathname == '/my-component' ? 'selected' : 'default-nav-bar'}`}>Tasks</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className="main"><h1 style={{'color':'#0059b3'}}>Welcome to the<br></br> Task Portal !</h1><img src={logo} alt="Logo" /></div>

        } />
        <Route path="/my-component" element={<Kanban />} />
      </Routes>
    </div>
  );
  

}
export default App;

