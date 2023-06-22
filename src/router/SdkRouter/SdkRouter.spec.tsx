import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SdkRouter from './SdkRouter';

describe('SdkRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/*']}>
        <SdkRouter />
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
});
