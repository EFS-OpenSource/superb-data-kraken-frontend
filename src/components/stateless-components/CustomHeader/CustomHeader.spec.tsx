import { render } from '@testing-library/react';

import CustomHeader from './CustomHeader';

describe('CustomHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomHeader />);
    expect(baseElement).toBeTruthy();
  });
});
