import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { messagesDe, messagesEn } from '../../../../translations';
import SecondaryTab from './SecondaryTab';

describe('SecondaryTab', () => {
  it('should render successfully', () => {
    const messages: Record<string, unknown> = {
      de: messagesDe,
      en: messagesEn,
    };
    const { baseElement } = render(
      <IntlProvider
        locale="de"
        defaultLocale="de"
        messages={(messages['de'] as any) ?? messages.de}
      >
        <SecondaryTab tab="AppPage.Overview" />
      </IntlProvider>,
    );
    expect(baseElement).toBeTruthy();
  });
});
