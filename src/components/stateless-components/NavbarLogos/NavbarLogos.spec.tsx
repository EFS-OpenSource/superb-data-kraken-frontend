import { render } from '@testing-library/react';

import NavbarLogos from './NavbarLogos';

describe('DashboardLogos', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavbarLogos type="SDK" />);
    expect(baseElement).toBeTruthy();
  });
});
