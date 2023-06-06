import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Header from "./layouts/Header"
import "./assets/styles/corporateDesign.css";
import Aare from "./components/Aare/Aare";
import GameLib from './components/GameLib/GameLib';
import AareBern from "./components/AareBern/AareBern";
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className=''>
        <header className=''>
          <Header />
        </header>
        
        <AareBern />
        {/* <App /> */}
        {/* <Aare/>   */}

        {/* <GameLib/> */}
      </div>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
