import { render } from '@testing-library/react';
import { IntlWrapper } from '@contexts/IntlProviderWrapper';

test('context provider should render successfully', () => {
  render(
    <IntlWrapper>
      <div />
    </IntlWrapper>
  );
});
