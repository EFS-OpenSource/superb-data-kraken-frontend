import { render } from '@testing-library/react';

import AppPageHeader from './AppPageHeader';

describe('AppPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppPageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
