import { render } from '@testing-library/react';

import Description from './Description';

describe('Description', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Description />);
    expect(baseElement).toBeTruthy();
  });
});
