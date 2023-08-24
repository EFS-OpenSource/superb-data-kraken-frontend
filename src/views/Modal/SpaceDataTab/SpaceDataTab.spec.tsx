import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import SpaceDataTab from './SpaceDataTab';
import MockOrganization from '@assets/UserData';
describe('SpaceDataTab', () => {
  it('should render successfully', () => {
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <SpaceDataTab
          handleChange={handleChange}
          modalData={MockOrganization.spaces[0]}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
