import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import OrganizationGeneralTab from './OrganizationGeneralTab';
import MockOrganization from '@assets/UserData';

describe('OrganizationGeneralTab', () => {
  it('should render successfully', () => {
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
