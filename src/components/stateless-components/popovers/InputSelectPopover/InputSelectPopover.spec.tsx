/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

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
