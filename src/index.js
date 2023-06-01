import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Header from "./layouts/Header"
import "./assets/styles/corporateDesign.css";
import Aare from "./components/Aare/Aare";
import GameLib from './components/GameLib/GameLib';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <body className='bg-dark-color h-screen'>
    <header>
    <Header />
    </header>
    <App />
    <Aare/>  

    <GameLib/>
    </body>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
