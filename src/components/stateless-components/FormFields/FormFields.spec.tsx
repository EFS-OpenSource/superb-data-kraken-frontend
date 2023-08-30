import { render } from '@testing-library/react';

import {
  FormInput,
  FormTextarea,
  FormCheckbox,
  FormRadioButtons,
} from './FormFields';

describe('FormFields', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormInput id={''} ariaLabel={''} labelText={''} />,
    );
    expect(baseElement).toBeTruthy();
  });
});
