import { useMemo, useState, createContext } from 'react';
import { IntlProvider } from 'react-intl';
import { messagesDe, messagesEn } from '../translations';

const messages: Record<string, Record<string, string>> = {
  de: messagesDe,
  en: messagesEn,
};

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const IntlWrapperContext = createContext({} as LanguageContextType);

export const IntlWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [language, setLanguage] = useState('de');

  const LanguageContext = useMemo(
    () => ({ language, setLanguage }),
    [language],
  );

  return (
    <IntlWrapperContext.Provider value={LanguageContext}>
      <IntlProvider
        locale={language}
        defaultLocale="de"
        messages={
          (messages[language].default as unknown as Record<string, string>) ??
          messages.de
        }
      >
        {children}
      </IntlProvider>
    </IntlWrapperContext.Provider>
  );
};
