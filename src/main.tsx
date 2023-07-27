import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OidcProvider } from '@axa-fr/react-oidc';
import SdkRouter from 'src/router/SdkRouter/SdkRouter';
import { IntlWrapper } from 'src/contexts/IntlProviderWrapper';
import { oidcConfiguration, oidcProps } from './utils/authConf.js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

if (navigator.serviceWorker.controller) {
  root.render(
    <OidcProvider
      configuration={oidcConfiguration}
      loadingComponent={oidcProps.loadingComponent}
      callbackSuccessComponent={oidcProps.callbackSuccessComponent}
      authenticatingComponent={oidcProps.authenticatingComponent}
    >
      <BrowserRouter basename={import.meta.env.DEV ? '/' : '/bla'}>
        <StrictMode>
          <IntlWrapper>
            <Routes>
              <Route path="/*" element={<SdkRouter />} />
            </Routes>
          </IntlWrapper>
        </StrictMode>
      </BrowserRouter>{' '}
    </OidcProvider>,
  );
} else {
  window.location.reload();
}
