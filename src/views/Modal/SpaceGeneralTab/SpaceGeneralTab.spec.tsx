import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import SpaceGeneralTab from './SpaceGeneralTab';
import MockOrganization from '@assets/UserData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
describe('SpaceGeneralTab', () => {
  it('should render successfully', () => {
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <SpaceGeneralTab
            handleChange={handleChange}
            modalData={MockOrganization.spaces[0]}
          />
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
