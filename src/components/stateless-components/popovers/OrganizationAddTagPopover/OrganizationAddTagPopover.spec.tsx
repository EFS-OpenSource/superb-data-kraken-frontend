import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import OrganizationAddTagPopover from './OrganizationAddTagPopover';

describe('OrganizationAddTagPopover', () => {
  it('should render successfully', () => {
    const handleAddOrgaTag = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <OrganizationAddTagPopover handleAddOrgaTag={handleAddOrgaTag} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
