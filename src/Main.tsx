/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OidcProvider } from '@axa-fr/react-oidc';
import { SdkRouter } from '@router/index';
import { IntlWrapper } from '@contexts/index';
import oidcConfiguration from '@utils/authConf';

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

root.render(
  <OidcProvider
    configuration={oidcConfiguration}
    // loadingComponent={oidcProps.loadingComponent}
    // callbackSuccessComponent={oidcProps.callbackSuccessComponent}
    // authenticatingComponent={oidcProps.authenticatingComponent}
  >
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/sdk-frontend'}>
      <StrictMode>
        <IntlWrapper>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {navigator.serviceWorker.controller ? (
                <Route path="/*" element={<SdkRouter />} />
              ) : (
                <Route path="/login" element={<SdkRouter />} />
              )}
            </Routes>
          </QueryClientProvider>
        </IntlWrapper>
      </StrictMode>
    </BrowserRouter>
  </OidcProvider>,
);
