import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SdkRouter from 'src/router/SdkRouter/SdkRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/*" element={<SdkRouter />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
