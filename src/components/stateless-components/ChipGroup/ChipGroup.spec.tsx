import { render } from '@testing-library/react';

import ChipGroup from './ChipGroup';

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
});
