import { render } from '@testing-library/react';

import AppPage from './AppPage';

describe('AppPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppPage />);
    expect(baseElement).toBeTruthy();
  });
});
