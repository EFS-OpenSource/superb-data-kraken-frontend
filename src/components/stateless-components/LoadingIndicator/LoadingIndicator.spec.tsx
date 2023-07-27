import { render } from '@testing-library/react';

import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadingIndicator />);
    expect(baseElement).toBeTruthy();
  });
});
