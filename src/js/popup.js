import App from './components/App';
import React from "react";
import { render } from "react-dom";
import '../css/popup.css';

render(
  <App/>,
  window.document.getElementById("app-container")
);
