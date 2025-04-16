import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from './compinents/RegisterForm';
import LoginForm from './compinents/LoginForm'
import NotFound from './pages/NotFound';
import Navbar from "./compinents/Navbar";
import Home from "./pages/Home";
import ProductDetails from './pages/ProductDetails';
import Footer from './compinents/Footer';
import CartContextGlobal from './context/CartContext';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <CartContextGlobal>
        <Router>
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </CartContextGlobal>
    </div>
  );
}


export default App
