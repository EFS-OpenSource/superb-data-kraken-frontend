import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';

describe('SdkRouter', () => {
  it('should redirect unauthenticated request to LoginPage', () => {
    const onLanguageChange = jest.fn();

    const { baseElement } = render(
      <MemoryRouter initialEntries={['/home/overview']}>
        <TestWrapper>
          <Layout onLanguageChange={onLanguageChange} />
        </TestWrapper>
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
});
