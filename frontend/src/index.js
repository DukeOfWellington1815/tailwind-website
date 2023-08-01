import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import './assets/styles/corporateDesign.css';
import Aare from './components/Aare/Aare';
import GameLib from './components/GameLib/GameLib';
import AareBern from './components/AareBern/AareBern';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectsPage from './pages/projects';
import DossierPage from './pages/dossier';
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import { Route, Routes } from 'react-router-dom';
import withAuth from './withAuth';
import NotFound from './pages/notfound';
import useSession from './middleware/session'; // Replace 'path/to' with the actual path to useSession.js

const ProtectedProjectsPage = withAuth(ProjectsPage);
const ProtectedDossierPage = withAuth(DossierPage);
const ProtectedHomePage = withAuth(AareBern);

const AppRouter = ({ isLoggedIn }) => (
  <React.StrictMode>
    {isLoggedIn && (
      <header className="">
        <Header />
      </header>
    )}
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/" element={<ProtectedHomePage />} />
      <Route path="/projects" element={<ProtectedProjectsPage />} />
      <Route path="/dossier" element={<ProtectedDossierPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>

    <footer className="">
      <Footer />
    </footer>
  </React.StrictMode>
);

const AppWrapper = () => {
  // Get the isLoggedIn value from the useSession hook
  const { isLoggedIn } = useSession();

  return <AppRouter isLoggedIn={isLoggedIn} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the AppWrapper component with the Router component
root.render(
  <Router>
    <AppWrapper />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);