import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import AddTagPopover from './AddTagPopover';

describe('AddTagPopover', () => {
  it('should render successfully', () => {
    const handleAddTag = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <AddTagPopover handleAddTag={handleAddTag} placeholder={''} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
