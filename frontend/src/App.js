import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <RestAPI></RestAPI>
      </header>
    </div>
  );
}

function RestAPI() {
  const [text, setText] = useState("");

  return (
    <>
      <div>
        <button onClick={()=>{
          axios.get("http://3.36.50.105:8000/stock/hello/")
          .then(function (response) {
            console.log(response);
            { setText("test") };
          })
        }}
        >button</button>
      </div>

      <div>
        <button onClick={()=>{
          axios.get("http://127.0.0.1:8000/stock/hello/")
          .then(function (response) {
            console.log(response);
          })
        }}
        >button</button>
      </div>

      <div> 
        {text}
      </div>
    </>
  )
}


export default App;
