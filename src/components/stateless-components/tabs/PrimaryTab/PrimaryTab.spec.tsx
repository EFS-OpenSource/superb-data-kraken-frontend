import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { messagesDe, messagesEn } from '../../../../translations';

import { MemoryRouter } from 'react-router-dom';
import PrimaryTab from './PrimaryTab';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

describe('PrimaryTab', () => {
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
        <MemoryRouter initialEntries={['/org/2/Overview']}></MemoryRouter>
      </IntlProvider>,
    );
    expect(baseElement).toBeTruthy();
  });
});
