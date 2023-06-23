import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { messagesDe, messagesEn } from '../../../../translations';
import Tabs from './Tabs';
import PrimaryTab from 'src/components/stateless-components/tabs/PrimaryTab/PrimaryTab';

const messages: Record<string, unknown> = {
  de: messagesDe,
  en: messagesEn,
};

const tabs = [
  {
    name: 'HomePage.overview',
    id: 'HomePage.overview',
    level: 'primary',
    content: <div>Hello</div>,
    path: 'overview',
  },
  {
    name: 'HomePage.news',
    id: 'HomePage.news',
    level: 'secondary',
    content: <div>Bye</div>,
    path: 'news',
  },
];

const tabsDisabled = [
  {
    name: 'HomePage.overview',
    id: 'HomePage.overview',
    level: 'primary',
    content: <div>Hello</div>,
    path: 'overview',
    disabledStyle: 'none',
    inactiveStyle: '',
    disabled: true,
    tooltipMessage: '',
  },
  {
    name: 'HomePage.news',
    id: 'HomePage.news',
    level: 'secondary',
    content: <div>Bye</div>,
    path: 'news',
    disabledStyle: 'none',
    inactiveStyle: '',
    disabled: true,
    tooltipMessage: '',
  },
];
describe('Tabs', () => {
  it('should render tabs successfully', () => {
    const { baseElement } = render(
      <IntlProvider
        locale="de"
        defaultLocale="de"
        messages={(messages['de'] as Record<string, string>) ?? messages.de}
      >
        <MemoryRouter initialEntries={['/org/2/Overview']}>
          <Routes>
            <Route
              path="/org/:orgID/Overview/*"
              element={<Tabs tabs={tabs} />}
            />
          </Routes>
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(baseElement).toBeTruthy();
  });
  // it('should be disabled', () => {
  //   const { baseElement } = render(
  //     <IntlProvider
  //       locale="de"
  //       defaultLocale="de"
  //       messages={(messages['de'] as Record<string, string>) ?? messages.de}
  //     >
  //       <MemoryRouter initialEntries={['/org/2/Overview']}>
  //         <Routes>
  //           <Route
  //             path="/org/:orgID/Overview/*"
  //             element={<Tabs tabs={tabsDisabled} />}
  //           />
  //         </Routes>
  //       </MemoryRouter>
  //     </IntlProvider>,
  //   );
  //   expect(baseElement).toBeTruthy();
  // });
});
