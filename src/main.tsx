import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SdkRouter from 'src/router/SdkRouter/SdkRouter';
import { IntlWrapper } from 'src/contexts/IntlProviderWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter basename={import.meta.env.DEV ? '/' : '/bla'}>
    <StrictMode>
      <IntlWrapper>
        <Routes>
          <Route path="/*" element={<SdkRouter />} />
        </Routes>
      </IntlWrapper>
    </StrictMode>
  </BrowserRouter>,
);
