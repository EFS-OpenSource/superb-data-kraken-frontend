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

import { IntlProvider } from 'react-intl';
import { messagesDe, messagesEn } from '../../translations';
// import { FeatureContextProvider } from '../contexts/FeatureContextProvider'

const messages: Record<string, unknown> = {
  de: messagesDe,
  en: messagesEn,
};

// const client = new QueryClient();

const TestWrapperNoOIDC = ({ children }: { children: React.ReactNode }) => (
  /* <QueryClientProvider client={client}> */
  <IntlProvider
    locale="de"
    defaultLocale="de"
    messages={(messages['de'] as Record<string, string>) ?? messages.de}
  >
    {children}
  </IntlProvider>
  /* </QueryClientProvider> */
);

export default TestWrapperNoOIDC;
