import { render } from '@testing-library/react';

import SelectWithAutocomplete from './SelectWithAutocomplete';
import { DropdownOptions } from '@customTypes/reactSelectTypes';

describe('SelectWithAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SelectWithAutocomplete
        options={[]}
        onChange={function (value: DropdownOptions | null): void {
          throw new Error('Function not implemented.');
        }}
        placeholder={''}
        value={null}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
