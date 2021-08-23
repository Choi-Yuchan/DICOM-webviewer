import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import initCornerstone from './extenstion/InitCornerstone';

const Globalstyle = createGlobalStyle`
  body{
    background-color: #fefefe;
    box-sizing: border-box;
  }
  h1{
    color: #000080;
    text-align: center;
  }
`;

initCornerstone();
ReactDOM.render(
    <BrowserRouter>
      <Globalstyle/>
      <App />
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
