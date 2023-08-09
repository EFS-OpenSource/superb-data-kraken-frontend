import { render } from '@testing-library/react';

import Spaces from './Spaces';

describe('Spaces', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spaces />);
    expect(baseElement).toBeTruthy();
  });
});
