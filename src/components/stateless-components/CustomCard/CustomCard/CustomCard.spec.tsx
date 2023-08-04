import { render } from '@testing-library/react';

import CustomCard from './CustomCard';

describe('CustomCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomCard />);
    expect(baseElement).toBeTruthy();
  });
});
