import { render } from '@testing-library/react';

import DashboardLogos from './DashboardLogos';

describe('DashboardLogos', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardLogos />);
    expect(baseElement).toBeTruthy();
  });
});
