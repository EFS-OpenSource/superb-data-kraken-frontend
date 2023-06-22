import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <span>Hello World</span>
  </StrictMode>,
);
