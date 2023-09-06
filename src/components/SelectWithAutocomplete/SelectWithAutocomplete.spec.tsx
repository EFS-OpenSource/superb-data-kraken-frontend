import { render } from '@testing-library/react';

import SelectWithAutocomplete from './SelectWithAutocomplete';

describe('SelectWithAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectWithAutocomplete />);
    expect(baseElement).toBeTruthy();
  });
});
