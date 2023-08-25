import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import MembersTable from './MembersTable';
import { OrgaSpaceUser } from '@customTypes/userTypes';

describe('MembersTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTable
          initialMembers={undefined}
          members={undefined}
          roles={[]}
          onRemoveMember={function (
            member:
              | OrgaSpaceUser<'access' | 'trustee' | 'admin'>
              | OrgaSpaceUser<'trustee' | 'user' | 'supplier'>,
          ): void {
            throw new Error('Function not implemented.');
          }}
          onHandleChange={function (
            passedData:
              | OrgaSpaceUser<'access' | 'trustee' | 'admin'>
              | OrgaSpaceUser<'trustee' | 'user' | 'supplier'>,
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
