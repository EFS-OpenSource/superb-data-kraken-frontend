import { Icon, Chip } from '@components/index';
import { render } from '@testing-library/react';
import { BsLock } from 'react-icons/bs';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import CustomCardTitle from './CustomCardTitle';
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

describe('CustomCardTitleLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <CustomCardTitle data={data.organizations} cardType="organization" />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it("data to have property 'state' in Space, that can change from 'OPEN' to 'CLOSED' ", () => {
    const lockBsClasses = 'my-0 mx-3 w-auto';
    const lockInlineStyles = { height: '1.6rem' };
    const closedLock = (
      <Icon
        icon={BsLock}
        type="button"
        className={lockBsClasses}
        style={lockInlineStyles}
      />
    );

    expect(data.organizations.spaces[0].state).toBe('OPEN');
    data.organizations.spaces[0].state = 'CLOSED';
    expect(data.organizations.spaces[0].state).toBe('CLOSED');

    if (data.organizations.spaces[0].state === 'CLOSED') {
      expect(closedLock).toBeTruthy();
    }
  });

  it('render a Chip Tag', () => {
    const chip = render(
      <TestWrapper>
        <Chip text="TestChip" />
      </TestWrapper>,
    );
    expect(chip).not.toBeNull();
  });

  it("Spaces to have a 'tag' array with tags", () => {
    const tagMockData = data.organizations.spaces.map((space) =>
      space.tags!.map((tag) => tag),
    );

    expect(tagMockData).not.toBeNull();
  });
});
