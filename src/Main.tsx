import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OidcProvider } from '@axa-fr/react-oidc';
import { SdkRouter } from '@router/index';
import { IntlWrapper } from '@contexts/index';
import { oidcConfiguration, oidcProps } from '@utils/authConf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

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
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/*" element={<SdkRouter />} />
              </Routes>
            </QueryClientProvider>
          </IntlWrapper>
        </StrictMode>
      </BrowserRouter>
    </OidcProvider>,
  );
} else {
  window.location.reload();
}
