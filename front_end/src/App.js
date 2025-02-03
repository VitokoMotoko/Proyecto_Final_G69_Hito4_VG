import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/Routes';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;