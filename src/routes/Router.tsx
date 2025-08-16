import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import ChatThreadPage from '../pages/ChatThreadPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<ChatThreadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
