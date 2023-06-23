import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TestWrapper from 'src/utils/TestWrapper/TestWrapper.spec';

import SdkRouter from './SdkRouter';

describe('SdkRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MemoryRouter initialEntries={['/*']}>
          <SdkRouter />
        </MemoryRouter>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
