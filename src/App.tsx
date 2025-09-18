import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MePage from './pages/HomePage';
import MyWorkPage from './pages/MyWorkPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg relative">
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<MePage />} />
              <Route path="/my-work" element={<MyWorkPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App; 