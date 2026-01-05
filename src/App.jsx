import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from "./components/Header";
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import CartPage from './pages/CartPage';
import RemindersPage from './pages/RemaindersPage.jsx';
import PharmacyPage from './pages/PharmacyPage.jsx';
function App() {
  return (
    <Router>
      <Helmet>
        <title>MediCare - Your Digital Pharmacy Assistant</title>
        <meta name="description" content="Upload prescriptions, manage medications, set reminders, and order from verified pharmacies - all in one place." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/pharmacy" element={<PharmacyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;