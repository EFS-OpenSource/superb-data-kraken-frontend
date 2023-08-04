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
