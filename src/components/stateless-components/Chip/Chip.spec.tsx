import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';

import Chip from './Chip';

describe('Chip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
