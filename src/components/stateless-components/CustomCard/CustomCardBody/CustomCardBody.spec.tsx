import { render } from '@testing-library/react';
import { CustomCardBody } from '@components/index';
import TestWrapperNoOIDC from '../../../../utils/TestWrapper/TestWrapperNoOIDC';
import MockOrganization from '../../../../assets/UserData';

const data = {
  name: 'Peter Parker',
  email: 'test.user@efs-auto.com',
  roles: [
    'org_sdkcorestorage_admin',
    'spc_all_public',
    'offline_access',
    'SDK_USER',
    'org_all_public',
    'SDK_ADMIN',
    'uma_authorization',
    'all_access',
    'sdkcorestorage_test-container_trustee',
    'default-roles-efs-sdk',
  ],
  organizations: MockOrganization,
};

describe('CustomCardBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <CustomCardBody data={data.organizations} cardType="organization" />
      </TestWrapperNoOIDC>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render data', () => {
    expect(data).toBeTruthy();
  });
});
