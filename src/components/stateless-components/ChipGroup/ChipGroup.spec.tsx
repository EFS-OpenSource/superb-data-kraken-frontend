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

import { fireEvent, getByText, render } from '@testing-library/react';

import ChipGroup from './ChipGroup';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';

describe('ChipGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ChipGroup
        options={[]}
        checked={[]}
        onChange={function (checked: string[]): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with onClickEvent working, isActive true', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <ChipGroup
          options={[{label: 'AnOption', value: 'IAmAnOption'}]}
          checked={['AnOption']}
          onChange={function (checked: string[]): void {}}
        />
      </TestWrapperNoOIDC>
    );
    fireEvent.click(getByText(baseElement, 'IAmAnOption'));
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with onClickEvent working, isActive false', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <ChipGroup
          options={[{label: 'AnOption', value: 'IAmAnOption'}]}
          checked={['AnotherOption']}
          onChange={function (checked: string[]): void {
            console.log('I work');
          }}
        />
      </TestWrapperNoOIDC>
    );
    fireEvent.click(getByText(baseElement, 'IAmAnOption'));
    expect(baseElement).toBeTruthy();
  });
});
