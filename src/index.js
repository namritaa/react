import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for createRoot
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App/App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root
root.render(
  <Router>
    <App />
  </Router>
);

