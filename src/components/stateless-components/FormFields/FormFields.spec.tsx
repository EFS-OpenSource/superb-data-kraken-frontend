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

import {
  FormInput,
  FormTextarea,
  FormCheckbox,
  FormRadioButtons,
} from './FormFields';
import { Bs123 } from 'react-icons/bs';

describe('FormFields', () => {
  it('should render FormInput successfully', () => {
    const { baseElement } = render(
      <FormInput id={''} ariaLabel={''} labelText={''} />
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render FormTextarea successfully', () => {
    const { baseElement } = render(
      <FormTextarea
        id={''}
        ariaLabel={''}
        labelText={''}
        labelToolTipIcon={<Bs123 />}
      />
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render FormRadioButtons successfully', () => {
    const { baseElement } = render(
      <FormRadioButtons
        id={''}
        ariaLabel={''}
        labelText={''}
        labelToolTipIcon={<Bs123 />}
        labelsAndValues={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render FormCheckbox successfully', () => {
    const { baseElement } = render(
      <FormCheckbox
        id={''}
        ariaLabel={''}
        labelText={''}
        labelToolTipIcon={<Bs123 />}
        labelsAndValues={[{ name: 'test', value: 'test' }]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
