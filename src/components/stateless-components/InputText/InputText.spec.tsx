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

import { render, fireEvent } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  test('renders input with correct placeholder', () => {
    const baseElement = render(
      <InputText placeholder="Enter some text" onChange={() => {}} />,
    );
    const input = baseElement.findByText('Home', {
      selector: 'button',
    });
    expect(input).toBeTruthy();
  });

  test('calls onChange callback when input value changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputText placeholder="Enter some text" onChange={mockOnChange} />,
    );
    const input = getByPlaceholderText('Enter some text');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
