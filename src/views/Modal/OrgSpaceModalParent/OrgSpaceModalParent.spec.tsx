import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import OrgSpaceModalParent from './OrgSpaceModalParent';

describe('OrgSpaceModalParent', () => {
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();
  const setActiveKey = jest.fn();
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <OrgSpaceModalParent
          modalType={'createOrganization'}
          modalTabs={[]}
          show={false}
          validated={false}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          activeKey={''}
          setActiveKey={setActiveKey}
          nextButton={<button />}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
