import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from 'src/views/HomePage/HomePage';

function SdkRouter() {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
}

export default SdkRouter;
