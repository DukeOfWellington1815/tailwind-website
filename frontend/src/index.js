import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import './assets/styles/corporateDesign.css';
import { BrowserRouter as Router } from 'react-router-dom';
import projectsPage from './pages/projects';
import dossierPage from './pages/dossier';
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/notfound';
import HomePage from './pages/home';
import withAuth from './withAuth'; // Re-import withAuth

const ProtectedDossierPage = withAuth(dossierPage); // Wrap the dossierPage with withAuth

const AppRouter = () => (
  <React.StrictMode>
    <header className="sticky top-0 z-50">
      <Header />
    </header>

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/dossier" element={<ProtectedDossierPage />} /> {/* Use ProtectedDossierPage */}
      <Route path="/*" element={<NotFound />} />
    </Routes>

    <footer className="">
      <Footer />
    </footer>
  </React.StrictMode>
);

const AppWrapper = () => {
  return <AppRouter />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AppWrapper />
  </Router>
);

reportWebVitals(console.log);
