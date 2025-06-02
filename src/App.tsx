import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BoltBadge from './components/common/BoltBadge';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateListingPage from './pages/CreateListingPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/auth/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/create-listing" 
                element={
                  <PrivateRoute>
                    <CreateListingPage />
                  </PrivateRoute>
                } 
              />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          <Footer />
          <BoltBadge />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;