import { render } from '@testing-library/react';

import RequireAuthentication from './RequireAuthentication';

describe('RequireAuthentication', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RequireAuthentication />);
    expect(baseElement).toBeTruthy();
  });
});
