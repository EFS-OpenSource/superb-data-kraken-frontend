import { render } from '@testing-library/react';

import ErrorToast from './ErrorToast';

describe('ErrorToast', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorToast />);
    expect(baseElement).toBeTruthy();
  });
});
