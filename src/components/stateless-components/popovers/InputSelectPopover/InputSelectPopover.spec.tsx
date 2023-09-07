import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import InputSelectPopover from './InputSelectPopover';
import { Button } from 'react-bootstrap';

describe('InputSelectPopover', () => {
  it('should render successfully', () => {
    const handleShow = jest.fn();
    const openPopoverButton = (
      <Button
        aria-label="applyAccessButton"
        size="sm"
        onClick={(e) => handleShow(e)}
      >
        Test
      </Button>
    );
    const { baseElement } = render(
      <TestWrapper>
        <InputSelectPopover
          id={''}
          placement={'auto'}
          buttonLabel={''}
          popoverOpenButton={openPopoverButton}
          dropdownOptions={[]}
          handleShow={handleShow}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
